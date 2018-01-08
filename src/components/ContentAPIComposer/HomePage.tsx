import React from 'react';
import FigureCollection from '../FigureCollection';
import FigureCollectionFigure from '../FigureCollectionFigure';
import {FalmerImage} from "../../types/events";

interface FigureCollectionBlock {
  id: string;
  value: {
    title: string;
    subtitle: string;
    link: string;
    image: FalmerImage;
  }
}

interface HomepageData {
  data: {
    fullTimeOfficers: FigureCollectionBlock[],
    partTimeOfficers: FigureCollectionBlock[]
  }
}

function HomePage({ data: { fullTimeOfficers, partTimeOfficers } }: HomepageData) {
  return (
    <div>
      <div className="ContentBlock">
        <div className="ContentBlock__heading">Your full-time officers</div>
        <FigureCollection>
          {fullTimeOfficers.map(item => (
            <FigureCollectionFigure
              key={item.id}
              title={item.value.title}
              sub={item.value.subtitle}
              link={item.value.link}
              imageResource={item.value.image.resource}
            />
          ))}
        </FigureCollection>
      </div>
      <div className="ContentBlock">
        <div className="ContentBlock__heading">Your part-time officers</div>
        <FigureCollection>
          {partTimeOfficers.map(item => (
            <FigureCollectionFigure
              key={item.id}
              title={item.value.title}
              sub={item.value.subtitle}
              link={item.value.link}
              imageResource={item.value.image.resource}
            />
          ))}
        </FigureCollection>
      </div>
    </div>
  );
}

export default HomePage;
