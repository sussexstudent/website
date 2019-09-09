import React from 'react';
import { OneImage, AspectRatio } from './OneImage';
import { InternalAppLink } from './InternalAppLink';

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
    <InternalAppLink className="SelectionGrid__link" to={link}>
      <OneImage
        className="SelectionGrid__image"
        src={imageURL}
        alt=""
        aspectRatio={AspectRatio.r20by9}
      />
      <div className="SelectionGrid__title">{title}</div>
    </InternalAppLink>
  </li>
);

export default SelectionGridItem;
