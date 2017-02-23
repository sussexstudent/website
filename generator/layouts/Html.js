import React from 'react';
import { headContent } from '../head';

const HTML = ({ children, assets }) => (
  <html lang="en">
    <head dangerouslySetInnerHTML={{ __html: headContent(assets) }} />
    <body>
      {children}
    </body>
  </html>
);

HTML.propTypes = {
  children: React.PropTypes.node.isRequired,
  assets: React.PropTypes.object.isRequired,
};

export default HTML;
