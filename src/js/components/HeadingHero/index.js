import React from 'react';
import Image from '../Image';

const HeadingHero = ({ imageURL, title, description }) => (
  <Image className="HeadingImage" src={imageURL} type="bg">
    <h1 className="HeadingImage__title">{title}</h1>
    {description
      ? <div><div className="HeadingImage__desc">{description}</div></div>
      : null}
  </Image>
);

HeadingHero.propTypes = {
  imageURL: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
};

HeadingHero.defaultProps = {
  description: null,
};

export default HeadingHero;
