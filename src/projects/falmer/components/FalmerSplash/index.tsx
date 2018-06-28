import React from 'react';

interface FalmerSplashProps {
  image: string;
  text: string;
}

export const FalmerSplash: React.SFC<FalmerSplashProps> = (props) => {
  return (
    <div className="FalmerSplash">
      <img className="FalmerSplash__image" src={props.image} alt="" />
      <div className="FalmerSplash__text">{props.text}</div>
    </div>
  );
}
