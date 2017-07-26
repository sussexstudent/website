import React from 'react';
import { storiesOf } from '@storybook/react';
import Loader from './index';

storiesOf('Loader', module)
  .add('light', () => <Loader dark />)
  .add('dark', () =>
    <div
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#333333',
      }}
    >
      <Loader />
    </div>
  );
