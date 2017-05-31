import React from 'react';
import Image from './Image';

const SelectionGridItem = ({ link, imageURL, title }) => (
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

SelectionGridItem.propTypes = {
  link: React.PropTypes.node.isRequired,
  imageURL: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

SelectionGridItem.ui = {};

export default SelectionGridItem;
