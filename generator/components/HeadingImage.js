import React from 'react';

const HeadingImage = ({ imageURL, title }) => (
  <div
    className="HeadingImage"
    style={{ backgroundImage: `url(${imageURL}?thumbnail=true&height=700&width=2000&resize_type=CropToFit)` }}
  >
    <h1 className="HeadingImage__title">{title}</h1>
  </div>
);

HeadingImage.propTypes = {
  imageURL: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default HeadingImage;
