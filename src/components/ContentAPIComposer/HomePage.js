import React from 'react';
import FigureCollection from '../FigureCollection';

function HomePage({ data: { fullTimeOfficers, partTimeOfficers } }) {
  return (
    <div>
      <div className="ContentBlock">
        <div className="ContentBlock__heading">Your full-time officers</div>
        <FigureCollection>
          {fullTimeOfficers.map(item =>
            <FigureCollection.Figure
              key={item.id}
              title={item.value.title}
              sub={item.value.subtitle}
              link={item.value.link}
              imageResource={item.value.image.resource}
            />
          )}
        </FigureCollection>
      </div>
      <div className="ContentBlock">
        <div className="ContentBlock__heading">Your part-time officers</div>
        <FigureCollection>
          {partTimeOfficers.map(item =>
            <FigureCollection.Figure
              key={item.id}
              title={item.value.title}
              sub={item.value.subtitle}
              link={item.value.link}
              imageResource={item.value.image.resource}
            />
          )}
        </FigureCollection>
      </div>
    </div>
  );
}

export default HomePage;
