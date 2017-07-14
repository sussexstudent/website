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

const DefaultContainer = props => <div {...props} />;

/* eslint-disable react/no-danger */
/* eslint-disable no-inner-declarations */
function HydroLeaf(
  {
    contextToProps = {},
    className = '',
    name = null,
    container = DefaultContainer,
  } = {}
) {
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
            ...generatePropsForContext(contextToProps, this.context),
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

          let dataAc = `window.HYDROSTATE_${hydroKey} = ${JSON.stringify(
            serialProps
          )};`;

          if (hydroKey === null) {
            dataAc = '';
          } else {
            dataAc = `<script type="text/javascript">${dataAc}</script>`;
          }

          return container({
            className: `${className} Hydro`,
            'data-component': name !== null ? name : Component.name,
            ...hydroIdSpread,
            dangerouslySetInnerHTML: {
              __html: `${componentMarkup}${dataAc}`,
            },
          });
        }
      }

      DeHydro.contextTypes = generateContextTypes(contextToProps);

      return DeHydro;
    }

    return Component;
  };
}
/* eslint-enable react/no-danger */
/* eslint-enable no-inner-declarations */

export default HydroLeaf;
