import React from 'react';
import Frame from 'react-frame-component';
import './style.css';

/* eslint-disable */

function renderComponent(part, components) {
  console.log(part, components);
  const component = components[part.component];
  const props = { ...part.props };

  const children = Object.hasOwnProperty.call(part, 'children')
    ? part.children.map(child => renderComponent(child, components))
    : null;

  return React.createElement(component, props, children);
}

const siteStyle = require('!to-string-loader!css-loader!postcss-loader!../../../../src/css/main.css');

const Renderer = ({ document, components }) => (
  <div className="Renderer">
    <Frame className="Renderer__frame" head={<style>{siteStyle}</style>}>
      {document.toJS().map(part => renderComponent(part, components))}
    </Frame>
  </div>
);

/* eslint-enable */

export default Renderer;
