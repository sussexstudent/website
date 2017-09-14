import React from 'react';
import PropTypes from 'prop-types';
import { headContent } from '../head';

const HTML = ({ children, assets }) => (
  <html lang="en">
    <head dangerouslySetInnerHTML={{ __html: headContent(assets) }} />
    {children}
  </html>
);

HTML.propTypes = {
  children: PropTypes.node.isRequired,
  assets: PropTypes.object.isRequired,
};

export default HTML;
