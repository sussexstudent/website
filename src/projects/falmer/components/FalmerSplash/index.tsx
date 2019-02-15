import React from 'react';
import { TypeSize, type } from '~libs/style/type';
import { css } from 'emotion';

interface FalmerSplashProps {
  image: any;
  text: string;
}

const rootCss = css({
  margin: '0 auto',
  maxWidth: 660,
});

const imageCss = css({
  opacity: 0.6,
  display: 'block',
  width: '80%',
  maxWidth: 300,
  margin: '12vh auto 2rem',
});

const textCss = css({
  textAlign: 'center',
  ...type(TypeSize.DoublePica),
});

export const FalmerSplash: React.FC<FalmerSplashProps> = (props) => {
  return (
    <div className={rootCss}>
      <div className={imageCss}>{props.image}</div>
      <div className={textCss}>{props.text}</div>
    </div>
  );
};
