import React from 'react';
import { Page } from '../types';
import { FalmerImage } from '@ussu/common/src/types/events';
import Helmet from 'react-helmet';
import { PersonCollectionFigure } from '../../../components/PersonCollection/PersonCollectionFigure';
import { PersonCollection } from '../../../components/PersonCollection';
import { shuffle } from 'lodash';

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
      <Helmet title={undefined} />
      <div className="ContentBlock">
        <div className="ContentBlock__heading">Your full-time officers</div>
        <PersonCollection size="small">
          {shuffle(fullTimeOfficers).map((item) => (
            <PersonCollectionFigure
              key={item.id}
              title={item.value.title}
              sub={item.value.subtitle}
              link={item.value.link}
              imageResource={item.value.image.resource}
            />
          ))}
        </PersonCollection>
      </div>
      <div className="ContentBlock">
        <div className="ContentBlock__heading">Your part-time officers</div>
        <PersonCollection size="small">
          {shuffle(partTimeOfficers).map((item) => (
            <PersonCollectionFigure
              key={item.id}
              title={item.value.title}
              sub={item.value.subtitle}
              link={item.value.link}
              imageResource={item.value.image.resource}
            />
          ))}
        </PersonCollection>
      </div>
    </div>
  );
}

export default HomePage;
