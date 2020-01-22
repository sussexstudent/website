import React from 'react';
import { OneImage, AspectRatio } from '../OneImage';

interface FigureCollectionFigureProps {
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

export const FigureCollectionFigure: React.FC<FigureCollectionFigureProps> = ({
  imageResource,
  title,
  sub,
  link,
}) => (
  <li className="FigureCollection__item TrailGrid__item">
    <a href={link} className="FigureCollection__link">
      <OneImage alt="" aspectRatio={AspectRatio.r1by1} src={imageResource} />
      <span className="FigureCollection__title">{title}</span>
      <span className="FigureCollection__secondary">{sub}</span>
    </a>
  </li>
);
