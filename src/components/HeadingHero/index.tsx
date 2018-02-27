import React from 'react';
import cx from 'classnames';
import HydroLeaf from '../HydroLeaf';
import { OneImageBackground } from '~components/OneImage';

interface IProps {
  imageURL: string;
  title: string;
  description?: string;
  thin?: boolean;
}

const HeadingHero = ({ imageURL, title, description = '', thin = false }: IProps) => (
  <OneImageBackground className={cx('HeadingImage', { 'HeadingImage--thin': thin})} src={imageURL}>
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
