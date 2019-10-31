import { storiesOf } from '@storybook/react';
import { PersonCollectionFigure } from '../../../website/src/components/PersonCollection/PersonCollectionFigure';

storiesOf('Person Collection', module).add('default', () => (
  <PersonCollectionFigure
    key={1}
    title="Person collection title"
    sub="Person collection subtitle"
    link="#"
    imageResource="asset/News/6412/unnamed.jpg"
  />
));
