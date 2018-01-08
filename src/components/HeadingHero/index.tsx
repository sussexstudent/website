import React from 'react';
import Image from '../Image';
import HydroLeaf from '../HydroLeaf';

interface IProps {
  imageURL: string;
  title: string;
  description?: string;
}

const HeadingHero = ({ imageURL, title, description = '' }: IProps) => (
  <Image className="HeadingImage" src={imageURL} type="bg">
    <h1 className="HeadingImage__title">{title}</h1>
    {description ? (
      <div>
        <div className="HeadingImage__desc">{description}</div>
      </div>
    ) : null}
  </Image>
);

export default HeadingHero;
export const Hydro = HydroLeaf()(HeadingHero);
