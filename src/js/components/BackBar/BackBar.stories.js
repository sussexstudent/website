import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BackBar from './index';

storiesOf('BackBar', module)
  .add('with text', () =>
    <BackBar onClick={action('clicked')}>Hello Button</BackBar>
  )
  .add('supports brand color', () =>
    <div>
      <BackBar color="red">Support</BackBar>
      <BackBar color="green">{"What's on"}</BackBar>
      <BackBar color="blue">Latest news</BackBar>
    </div>
  );
