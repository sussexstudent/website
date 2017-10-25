import React from 'react';

function FalmerSplash(props) {
  return (
    <div className="FalmerSplash">
      <img className="FalmerSplash__image" src={props.image} alt="" />
      <div className="FalmerSplash__text">{props.text}</div>
    </div>
  );
}

export default FalmerSplash;
