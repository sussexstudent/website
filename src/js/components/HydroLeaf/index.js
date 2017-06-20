import React from 'react';
import ReactDOM from 'react-dom/server';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

let hydroId = 0;

function generateContextTypes(contextToPropsMap) {
  const contextTypes = {};
  Object.keys(contextToPropsMap).forEach(
    contextName => (contextTypes[contextName] = PropTypes.object)
  );

  return contextTypes;
}

function generatePropsForContext(contextToPropsMap, context) {
  const props = {};

  Object.keys(contextToPropsMap).forEach(contextName => {
    props[contextToPropsMap[contextName]] = context[contextName];
  });

  return props;
}

/* eslint-disable react/no-danger */
/* eslint-disable no-inner-declarations */
function HydroLeaf(contextToPropsMap = {}) {
  return function HydroLeafHOC(Component) {
    if (process.env.COMP === '1') {
      // eslint-disable-next-line
      class DeHydro extends React.Component {
        componentWillMount() {
          hydroId += 1;
        }

        render() {
          const props = this.props;
          if (process.env.HYDROLEAF_MODE === 'RENDER_COMPONENT') {
            return <Component {...props} />;
          }

          const serialProps = {
            ...props,
            ...generatePropsForContext(contextToPropsMap, this.context),
          };
          let hydroKey = hydroId;
          if (Object.hasOwnProperty.call(serialProps, 'hydroId')) {
            hydroKey = serialProps.hydroId;
            delete serialProps.hydroId;
          }

          let hydroIdSpread = {};

          if (isEmpty(serialProps)) {
            hydroKey = null;
          } else {
            hydroIdSpread = { 'data-id': hydroKey };
          }

          const componentMarkup = ReactDOM.renderToString(
            React.createElement(Component, serialProps)
          );

          const dataAc = `window.HYDROSTATE_${hydroKey} = ${JSON.stringify(
            serialProps
          )};`;

          return (
            <div className="HydroContainer">
              <div
                className="Hydro"
                data-component={Component.name}
                {...hydroIdSpread}
                dangerouslySetInnerHTML={{ __html: componentMarkup }}
              />
              {hydroKey !== null
                ? <script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{ __html: dataAc }}
                  />
                : null}
            </div>
          );
        }
      }

      DeHydro.contextTypes = generateContextTypes(contextToPropsMap);

      return DeHydro;
    }

    return Component;
  };
}
/* eslint-enable react/no-danger */
/* eslint-enable no-inner-declarations */

export default HydroLeaf;
