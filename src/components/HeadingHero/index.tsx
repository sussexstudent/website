import React from 'react';
import HydroLeaf from '../HydroLeaf';
import {OneImageBackground} from "~components/OneImage";

interface IProps {
  imageURL: string;
  title: string;
  description?: string;
}

const HeadingHero = ({ imageURL, title, description = '' }: IProps) => (
  <OneImageBackground className="HeadingImage" src={imageURL}>
    <h1 className="HeadingImage__title">{title}</h1>
    {description ? (
      <div>
        <div className="HeadingImage__desc">{description}</div>
      </div>
    ) : null}
  </OneImageBackground>
);

export default HeadingHero;
export const Hydro = HydroLeaf()(HeadingHero);
