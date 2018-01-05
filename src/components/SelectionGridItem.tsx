import React from 'react';
import Image from './Image';

interface IProps {
  link: string;
  imageURL: string;
  title: string;
}

const SelectionGridItem = ({ link, imageURL, title }: IProps) => (
  <li className="SelectionGrid__item SelectionGrid--underneath" key={link}>
    <a className="SelectionGrid__link" href={link}>
      <Image className="SelectionGrid__image" src={imageURL} type="bg">
        <div className="SelectionGrid__image-inside">
          <div className="SelectionGrid__title">{title}</div>
        </div>
      </Image>
    </a>
  </li>
);

export default SelectionGridItem;
