import React from 'react';
import Image from '@ussu/components/Image';
import PropTypes from 'prop-types';

const FigureCollectionFigure = ({ imageResource, title, sub, link }) =>
  <li className="FigureCollection__item">
    <a href={link} className="FigureCollection__link">
      <div className="u-responsive-ratio u-responsive-ratio--square">
        <Image className="ResponsiveImage" alt="" src={imageResource} />
      </div>
      <span className="FigureCollection__title">{title}</span>
      <span className="FigureCollection__secondary">{sub}</span>
    </a>
  </li>;

FigureCollectionFigure.propTypes = {
  imageURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

FigureCollectionFigure.ui = {
  displayName: 'item',
};

export default FigureCollectionFigure;
