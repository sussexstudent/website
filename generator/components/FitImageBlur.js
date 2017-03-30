import React from 'react';

function FitImageBlur({ imageURL }) {
  return (
    <div className="FitImageBlur">
      <div className="FitImageBlur__background" style={{ backgroundImage: `url('${imageURL}')` }} />
      <div className="FitImageBlur__image" style={{ backgroundImage: `url('${imageURL}')` }} />
    </div>
  );
}

FitImageBlur.propTypes = {
  imageURL: React.PropTypes.string.isRequired,
};


export default FitImageBlur;
