import React from 'react';

const FigureCollectionFigure = ({ image, title, sub }) => (
  <li className="FigureCollection__item">
    <a href="/officers/example" className="FigureCollection__link">
      <img className="FigureCollection__image" src={image} role="presentation" />
      <span className="FigureCollection__title">{title}</span>
      <span className="FigureCollection__secondary">{sub}</span>
    </a>
  </li>
);

FigureCollectionFigure.propTypes = {
  image: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  sub: React.PropTypes.string.isRequired,
};

export default FigureCollectionFigure;
