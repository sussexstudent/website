import React from 'react';
import { OneImageBackground } from './OneImage';

interface SelectionGridItemProps {
  link: string;
  imageURL: string;
  title: string;
}

const SelectionGridItem = ({ link, imageURL, title }: SelectionGridItemProps) => (
  <li
    className="SelectionGrid__item SelectionGrid--underneath TrailGrid__item"
    key={link}
  >
    <a className="SelectionGrid__link" href={link}>
      <OneImageBackground className="SelectionGrid__image" src={imageURL}>
        <div className="SelectionGrid__image-inside">
          <div className="SelectionGrid__title">{title}</div>
        </div>
      </OneImageBackground>
    </a>
  </li>
);

export default SelectionGridItem;
