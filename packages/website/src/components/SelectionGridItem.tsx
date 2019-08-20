import React from 'react';
import { OneImage, AspectRatio } from './OneImage';

interface SelectionGridItemProps {
  link: string;
  imageURL: string;
  title: string;
}

const SelectionGridItem = ({
  link,
  imageURL,
  title,
}: SelectionGridItemProps) => (
  <li
    className="SelectionGrid__item SelectionGrid--underneath TrailGrid__item"
    key={link}
  >
    <a className="SelectionGrid__link" href={link}>
      <OneImage
        className="SelectionGrid__image"
        src={imageURL}
        alt=""
        aspectRatio={AspectRatio.r20by9}
      />
      <div className="SelectionGrid__image-inside">
        <div className="SelectionGrid__title">{title}</div>
      </div>
    </a>
  </li>
);

export default SelectionGridItem;
