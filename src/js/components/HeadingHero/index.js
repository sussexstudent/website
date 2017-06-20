import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image';
import HydroLeaf from '../HydroLeaf';

const HeadingHero = ({ imageURL, title, description }) =>
  <Image className="HeadingImage" src={imageURL} type="bg">
    <h1 className="HeadingImage__title">{title}</h1>
    {description
      ? <div><div className="HeadingImage__desc">{description}</div></div>
      : null}
  </Image>;

HeadingHero.propTypes = {
  imageURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

HeadingHero.defaultProps = {
  description: null,
};

export default HeadingHero;
export const Hydro = HydroLeaf()(HeadingHero);
