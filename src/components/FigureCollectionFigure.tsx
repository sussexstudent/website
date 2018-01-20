import React from 'react';
import Image from '~components/Image';

interface IProps {
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
      <div className="u-responsive-ratio u-responsive-ratio--square">
        <Image className="ResponsiveImage" alt="" src={imageResource} />
      </div>
      <span className="FigureCollection__title">{title}</span>
      <span className="FigureCollection__secondary">{sub}</span>
    </a>
  </li>
);

export default FigureCollectionFigure;
