import React from 'react';
import { OneImage, AspectRatio } from '~components/OneImage';

interface IProps {
  imageResource: string;
  title: string;
  sub: string;
  link: string;
}

export interface FigureData {
  imageResource: string;
  title: string;
  sub: string;
  link: string;
}

const FigureCollectionFigure = ({
  imageResource,
  title,
  sub,
  link,
}: IProps) => (
  <li className="FigureCollection__item">
    <a href={link} className="FigureCollection__link">
      <OneImage alt="" aspectRatio={AspectRatio.r1by1} src={imageResource} />
      <span className="FigureCollection__title">{title}</span>
      <span className="FigureCollection__secondary">{sub}</span>
    </a>
  </li>
);

export default FigureCollectionFigure;
