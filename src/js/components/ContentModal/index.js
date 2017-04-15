import React from 'react';

/* eslint-disable */
function ContentModal({ html }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}
/* eslint-enable */

ContentModal.propTypes = {
  html: React.PropTypes.string.isRequired,
};

export default ContentModal;
