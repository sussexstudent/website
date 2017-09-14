import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './index';

storiesOf('Button', module).add('default', () => (
  <div className="Container">
    <Button href="https://maps.google.com">Find us on Google Maps</Button>
  </div>
));
