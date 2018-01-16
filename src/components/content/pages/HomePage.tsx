import React from 'react';
import {Page} from "~components/content/types";
import {FalmerImage} from "../../../types/events";
import FigureCollection from "~components/FigureCollection";
import FigureCollectionFigure from "~components/FigureCollectionFigure";

interface FigureCollectionBlock {
  id: string;
  value: {
    title: string;
    subtitle: string;
    link: string;
    image: FalmerImage;
  }
}

interface IProps {
  page: Page<{ full_time_officers: FigureCollectionBlock[], part_time_officers: FigureCollectionBlock[] }>; // todo
}


function HomePage(props: IProps) {
  const { page: { data: { full_time_officers, part_time_officers } } } = props;

  return (
    <div>
      <div className="ContentBlock">
        <div className="ContentBlock__heading">Your full-time officers</div>
        <FigureCollection>
          {full_time_officers.map(item => (
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
          {part_time_officers.map(item => (
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
