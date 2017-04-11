import React from 'react';
import Frame from 'react-frame-component';
import './style.css';
import assets from '../../../.././webpack-assets.json';

/* eslint-disable */

function renderComponent(part, components) {
  console.log(part, components);
  const component = components[part.component];
  const props = { ...part.props };

  const children = Object.hasOwnProperty.call(part, 'children') ? part.children.map(child => renderComponent(child, components)) : null;

  return React.createElement(component, props, children);
}

const Renderer = ({ document, components }) => (
  <div className="Renderer">
    <Frame className="Renderer__frame" head={
      <link rel="stylesheet" href={assets.main.css} />
    }>
      {document.toJS().map(part => renderComponent(part, components))}
    </Frame>
  </div>
)

/* eslint-enable */

export default Renderer;
