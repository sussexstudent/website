import React from 'react';
import { OneImage, AspectRatio } from '../OneImage';

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

export const PersonCollectionFigure = ({
  imageResource,
  title,
  sub,
  link,
}: IProps) => (
  <li className="PersonCollection__item">
    <a href={link} className="PersonCollection__link">
      <div className="PersonCollection__image">
        <OneImage
          className="PersonCollection__img"
          alt=""
          aspectRatio={AspectRatio.r1by1}
          src={imageResource}
        />
      </div>
      <span className="PersonCollection__title">{title}</span>
      <span className="PersonCollection__secondary">{sub}</span>
    </a>
  </li>
);
