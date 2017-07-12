// DEPRECIATED: Use @ussu/components/HeadingHero
import React from 'react';
import PropTypes from 'prop-types';

const HeadingImage = ({ imageURL, title, description }) =>
  <div
    className="HeadingImage"
    style={{
      backgroundImage: `url(${imageURL}?thumbnail=true&height=700&width=2000&resize_type=CropToFit)`,
    }}
  >
    <h1 className="HeadingImage__title">
      {title}
    </h1>
    {description
      ? <div>
          <div className="HeadingImage__desc">
            {description}
          </div>
        </div>
      : null}
  </div>;

HeadingImage.propTypes = {
  imageURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

HeadingImage.defaultProps = {
  description: null,
};

export default HeadingImage;
