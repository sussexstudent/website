import { storiesOf } from '@storybook/react';
import { Accordion } from './index';

storiesOf('Accordion', module)
  .add('Closed', () => <Accordion isOpen={false} />)
  .add('Open', () => <Accordion isOpen={true} />);
