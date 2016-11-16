import React from 'react';

import './Color.css';

function Color(props) {
  return (
    <div className="Color">
      <div className="Color__display">
        <div className="Color__display-color" style={{ backgroundColor: `${props.color}` }} />
      </div>
      <p>{props.color}</p>
      <p>var(--{props.cssVar})</p>
    </div>
  );
}

Color.propTypes = {
  color: React.PropTypes.string,
  cssVar: React.PropTypes.string,
};

export default Color;
