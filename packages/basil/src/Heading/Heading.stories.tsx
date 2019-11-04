import { storiesOf } from '@storybook/react';
import { Heading, HeadingLevel } from '../../../website/src/components/Heading';

storiesOf('Headings', module).add('default', () => (
  <div>
    <Heading level={HeadingLevel.h1}>This is a level 1 heading </Heading>
    <hr></hr>
    <Heading level={HeadingLevel.h2}>This is a level 2 heading </Heading>
    <hr></hr>
    <Heading level={HeadingLevel.h3}>This is a level 3 heading </Heading>
    <hr></hr>
    <Heading level={HeadingLevel.h4}>This is a level 4 heading </Heading>
    <hr></hr>
    <Heading level={HeadingLevel.h5}>This is a level 5 heading </Heading>
    <hr></hr>
    <Heading level={HeadingLevel.h6}>This is a level 6 heading </Heading>
    <hr></hr>
  </div>
));
