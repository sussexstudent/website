import React from 'react';

const FigureCollectionFigure = ({ imageURL, title, sub, link }) => (
  <li className="FigureCollection__item">
    <a href={link} className="FigureCollection__link">
      <img
        className="FigureCollection__image"
        src={`${imageURL}?thumbnail=true&height=400&width=400&resize_type=CropToFit`}
        alt=""
      />
      <span className="FigureCollection__title">{title}</span>
      <span className="FigureCollection__secondary">{sub}</span>
    </a>
  </li>
);

FigureCollectionFigure.propTypes = {
  imageURL: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  sub: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
};

FigureCollectionFigure.ui = {
  displayName: 'item',
};

export default FigureCollectionFigure;
