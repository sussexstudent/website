import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../Button/index';

storiesOf('Button', module).add('one level', () => (
  <Button href="https://sussexstudent.com/">Link button</Button>
));
