import { storiesOf } from '@storybook/react';
import { ButtonLink } from './index';

storiesOf('Button', module).add('one level', () => (
  <ButtonLink href="https://sussexstudent.com/">Link button</ButtonLink>
));
