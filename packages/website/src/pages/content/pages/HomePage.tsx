import React from 'react';
import { Page } from '../types';
import { FalmerImage } from '@ussu/common/src/types/events';
import { Helmet } from 'react-helmet-async';
import { PersonCollectionFigure } from '../../../components/PersonCollection/PersonCollectionFigure';
import { PersonCollection } from '../../../components/PersonCollection';
import { shuffle } from 'lodash';
import { ScrollableSlice } from '@ussu/basil/src/ScrollableSlice';

interface FigureCollectionBlock {
  id: string;
  value: {
    title: string;
    subtitle: string;
    link: string;
    image: FalmerImage;
  };
}

interface HomepagePage extends Page {
  fullTimeOfficers: FigureCollectionBlock[];
  partTimeOfficers: FigureCollectionBlock[];
}

interface HomepageProps {
  page: HomepagePage;
}

export const Homepage: React.FC<HomepageProps> = (props) => {
  const {
    page: { fullTimeOfficers, partTimeOfficers },
  } = props;

  return (
    <div>
      <Helmet title={undefined} />
      <div className="ContentBlock">
        <h3 className="ContentBlock__heading">Your full-time officers</h3>
        <ScrollableSlice>
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
        </ScrollableSlice>
      </div>
      <div className="ContentBlock">
        <h3 className="ContentBlock__heading">Your part-time officers</h3>
        <ScrollableSlice>
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
        </ScrollableSlice>
      </div>
    </div>
  );
};
