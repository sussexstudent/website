import { storiesOf } from '@storybook/react';
import { InternalAppLink } from '../../../website/src/components/InternalAppLink/index';

storiesOf('Internal App Link', module).add('standard', () => (
  <InternalAppLink to="#">Test internal app link</InternalAppLink>
));
