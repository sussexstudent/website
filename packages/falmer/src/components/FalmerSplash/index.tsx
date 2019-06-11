import React from 'react';
import { TypeSize, type } from '@ussu/common/src/libs/style/type';

interface FalmerSplashProps {
  image: any;
  text: string;
}

export const FalmerSplash: React.FC<FalmerSplashProps> = (props) => {
  return (
    <div css={{
      margin: '0 auto',
      maxWidth: 660,
    }}>
      <div css={{
        opacity: 0.6,
        display: 'block',
        width: '80%',
        maxWidth: 300,
        margin: '12vh auto 2rem',
      }}>{props.image}</div>
      <div css={{
        textAlign: 'center',
        ...type(TypeSize.DoublePica),
      }}>{props.text}</div>
    </div>
  );
};
