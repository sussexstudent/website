import { PersonCollectionFigure } from '../../../website/src/components/PersonCollection/PersonCollectionFigure';

export default { title: 'Person Collection' };

export const Standard = () => (
  <PersonCollectionFigure
    key={1}
    title="Person collection title"
    sub="Person collection subtitle"
    link="#"
    imageResource="asset/News/6412/unnamed.jpg"
  />
);
