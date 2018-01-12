import React from 'react';
import ReactDOM from 'react-dom/server';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import {HydroRootServer} from "~components/HydroRootServer";

let hydroId = 0;

interface ContextToPropsMap {
  [contextName: string]: string;
}

interface ContextTypesMap {
  [contextName: string]: PropTypes.Requireable<any>;
}


interface HydroLeafOptions {
  contextToProps?: ContextToPropsMap;
  className?: string;
  name?: string;
  container?(props: any): any;
  disableSSR?: boolean;
}


function generateContextTypes(contextToPropsMap: ContextToPropsMap) {
  const contextTypes: ContextTypesMap = {};
  Object.keys(contextToPropsMap).forEach(contextName => {
    contextTypes[contextName] = PropTypes.object;
  });

  return contextTypes;
}

function generatePropsForContext(contextToPropsMap: ContextToPropsMap, context: { [contextName: string]: any; }) {
  const props: {
    [propName: string]: any;
  } = {};

  Object.keys(contextToPropsMap).forEach(contextName => {
    props[contextToPropsMap[contextName]] = context[contextName];
  });

  return props;
}

const DefaultContainer = ({ children = null, ...props }) => (
  <div {...props}>{children}</div>
);

interface IDeHydroProps {
  renderStatic?: boolean;
}

interface ISerialProps {
  hydroId?: number;
  children?: any;
}

/* eslint-disable react/no-danger */
/* eslint-disable no-inner-declarations */
function HydroLeaf(
  {
    contextToProps = {},
    className = '',
    name = null,
    container = DefaultContainer,
    disableSSR = false,
  }: HydroLeafOptions = {}
) {
  return function HydroLeafHOC(Component: any) {
    if (process.env.COMP_NODE) {
      // eslint-disable-next-line
      class DeHydro extends React.Component<IDeHydroProps> {
        static contextTypes = generateContextTypes(contextToProps);;

        componentWillMount() {
          hydroId += 1;
        }

        render() {
          const { renderStatic = false, ...props } = this.props;

          if (process.env.HYDROLEAF_MODE === 'RENDER_TO_COMPONENT') {
            console.log('component pass through');
            return <Component {...props} />;
          }

          const serialProps: ISerialProps = {
            ...props,
            ...generatePropsForContext(contextToProps, this.context),
          };
          let hydroKey: number | undefined = hydroId;
          if (Object.hasOwnProperty.call(serialProps, 'hydroId')) {
            hydroKey = serialProps.hydroId;
            delete serialProps.hydroId;
          }

          let hydroIdSpread = {};

          if (isEmpty(serialProps)) {
            hydroKey = undefined;
          } else {
            hydroIdSpread = { 'data-id': hydroKey };
          }

          if (renderStatic) {
            console.log('rendering static');
            return container({
              className,
              children: <Component {...serialProps} />,
            });
          }

          const componentMarkup = disableSSR
            ? ''
            : ReactDOM.renderToString(<HydroRootServer><Component {...serialProps} /></HydroRootServer>);

          let dataAc = `window.HYDROSTATE_${hydroKey} = ${JSON.stringify(
            serialProps
          )};`;

          if (hydroKey === undefined) {
            dataAc = '';
          } else {
            dataAc = `<script type="text/javascript" id="hydroscript-${hydroKey}">${dataAc}</script>`;
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

      return DeHydro;
    }

    return Component;
  };
}
/* eslint-enable react/no-danger */
/* eslint-enable no-inner-declarations */

export default HydroLeaf;
