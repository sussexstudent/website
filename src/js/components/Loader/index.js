import React from 'react';

function Loader({ dark }) {
  return (
    <div className="RippleLoader">
      <div style={{ borderColor: dark ? '#000' : '#fff' }} />
    </div>
  );
}

Loader.propTypes = {
  dark: React.PropTypes.boolean,
};

export default Loader;
