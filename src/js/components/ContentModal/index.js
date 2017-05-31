import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable */
function ContentModal({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
/* eslint-enable */

ContentModal.propTypes = {
  html: PropTypes.string.isRequired,
};

export default ContentModal;
