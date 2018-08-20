import React from 'react';
import { Page } from '~website/containers/content/types';
import { FalmerImage } from '~types/events';
import FigureCollection from '~components/FigureCollection';
import FigureCollectionFigure from '~components/FigureCollection/FigureCollectionFigure';

interface FigureCollectionBlock {
  id: string;
  value: {
    title: string;
    subtitle: string;
    link: string;
    image: FalmerImage;
  };
}

interface IHomePage extends Page {
  fullTimeOfficers: FigureCollectionBlock[];
  partTimeOfficers: FigureCollectionBlock[];
}

interface IProps {
  page: IHomePage;
}

function HomePage(props: IProps) {
  const {
    page: { fullTimeOfficers, partTimeOfficers },
  } = props;

  return (
    <div>
      <div className="ContentBlock">
        <div className="ContentBlock__heading">Your full-time officers</div>
        <FigureCollection>
          {fullTimeOfficers.map((item) => (
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
          {partTimeOfficers.map((item) => (
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
