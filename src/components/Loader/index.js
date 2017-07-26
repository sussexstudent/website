import React from 'react';
import PropTypes from 'prop-types';

function Loader({ dark }) {
  return (
    <div className="RippleLoader">
      <div style={{ borderColor: dark ? '#000' : '#fff' }} />
    </div>
  );
}

Loader.propTypes = {
  dark: PropTypes.bool.isRequired,
};

Loader.defaultProps = {
  dark: false,
};

export default Loader;
