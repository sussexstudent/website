import React from 'react';

const SelectionGridItem = ({ link, imageURL, title }) => (
  <li className="SelectionGrid__item SelectionGrid--underneath" key={link}>
    <a className="SelectionGrid__link" href={link}>
      <div
        className="SelectionGrid__image"
        style={{
          backgroundImage: `url(${imageURL}?thumbnail=true&height=230&width=640&resize_type=CropToFit)`,
        }}
      >
        <div className="SelectionGrid__image-inside">
          <div className="SelectionGrid__title">{title}</div>
        </div>
      </div>
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
