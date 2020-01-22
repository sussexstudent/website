import React from 'react';
import { PersonCollectionFigure } from '../../../website/src/components/PersonCollection/PersonCollectionFigure';

export default { title: 'Person Collection' };

export const OneItem = () => (
  <ul className="PersonCollection">
    <PersonCollectionFigure
      title="Person collection title"
      sub="Person collection subtitle"
      link="#"
      imageResource="/original_images/45243a9d35d14c05b275b60e5a911c68"
    />
  </ul>
);

export const MultipleItems = () => (
  <ul className="PersonCollection">
    {[
      ...Array(5)
        .fill(0)
        .map(() => <OneItem />),
    ]}
  </ul>
);

export const ScrollableItems = () => (
  <div style={{ width: '360px' }}>
    <div style={{ width: '100%', overflowX: 'scroll' }}>
      <div style={{ display: 'flex', minWidth: '100%' }}>
        <MultipleItems />
      </div>
    </div>
  </div>
);
