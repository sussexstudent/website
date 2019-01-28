import React from 'react';

interface FalmerSplashProps {
  image: any;
  text: string;
}

export const FalmerSplash: React.FC<FalmerSplashProps> = (props) => {
  return (
    <div className="FalmerSplash">
      <div className="FalmerSplash__image">{props.image}</div>
      <div className="FalmerSplash__text">{props.text}</div>
    </div>
  );
};
