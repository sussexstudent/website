import React from 'react';

interface IProps {
  image: string;
  text: string;
}

function FalmerSplash(props: IProps) {
  return (
    <div className="FalmerSplash">
      <img className="FalmerSplash__image" src={props.image} alt="" />
      <div className="FalmerSplash__text">{props.text}</div>
    </div>
  );
}

export default FalmerSplash;
