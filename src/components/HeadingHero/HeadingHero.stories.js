import React from 'react';
import { storiesOf } from '@storybook/react';
import HeadingHero from './index';

storiesOf('HeadingHero', module)
  .add('title only', () =>
    <div className="Container">
      <HeadingHero
        imageURL="/images/4219b2966c1047dd8fe4bfa2aa922c72.original.jpg"
        title={'Our holiday opening times'}
      />
    </div>
  )
  .add('width description', () =>
    <div className="Container">
      <HeadingHero
        imageURL="/images/4219b2966c1047dd8fe4bfa2aa922c72.original.jpg"
        title="Beware of seagulls"
        description="They are everywhere. They will get you."
      />
    </div>
  );
