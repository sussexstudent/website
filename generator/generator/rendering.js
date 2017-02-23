import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from '../layouts/Html';

class RenderBase extends React.Component {
  getChildContext() {
    return {
      assets: this.props.assets,
    };
  }

  render() {
    return this.props.children;
  }
}

RenderBase.childContextTypes = {
  assets: React.PropTypes.object.isRequired,
};

export const render = (Element, other = {}) => {
  if (other.inject) {
    global.mslInject = other.inject;
  }

  return ReactDOM.renderToStaticMarkup(<Element {...other} />);
};

export const renderHtml = (children, assets, other = {}) => {
  if (other.inject) {
    global.mslInject = other.inject;
  }

  return ReactDOM.renderToStaticMarkup((
    <Html assets={assets}>
      {children}
    </Html>
  )).replace('{head_content}', '');
};
export const renderInstance = (instance, assets, other = {}) => {
  if (other.inject) {
    global.mslInject = other.inject;
  }

  return ReactDOM.renderToStaticMarkup((
    <RenderBase assets={assets}>
      {instance}
    </RenderBase>
  ));
};

export function renderTemplates(templates, assets) {
  const renderedTemplates = {};
  Object.keys(templates).forEach((templateName) => {
    renderedTemplates[templateName] = {
      name: templateName,
      head: templates[templateName].head(assets),
      templateLoggedIn: render(templates[templateName].templateLoggedIn, { assets, loggedIn: true }),
      templatePublic: render(templates[templateName].templatePublic, { assets, loggedIn: false }),
    };
  });

  return renderedTemplates;
}

export function renderPages(pages) {
  const renderedPages = {};
  Object.keys(pages).forEach((pageName) => {
    renderedPages[pageName] = {
      name: pageName,
      content: render(pages[pageName]),
    };
  });

  return renderedPages;
}
