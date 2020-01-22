import React from 'react';
import cx from 'classnames';
import { OneImageBackground } from '../OneImage';

interface HeadingHeroProps {
  imageURL: string;
  title: string;
  description?: string;
  thin?: boolean;
}

export const HeadingHero: React.FC<HeadingHeroProps> = ({
  imageURL,
  title,
  description = '',
  thin = false,
}) => (
  <OneImageBackground
    className={cx('HeadingImage', { 'HeadingImage--thin': thin })}
    src={imageURL}
  >
    <h1 className="HeadingImage__title">{title}</h1>
    {description ? (
      <div>
        <div className="HeadingImage__desc">{description}</div>
      </div>
    ) : null}
  </OneImageBackground>
);
