import React from 'react';
import Imgix from 'react-imgix';

const ENDPOINT = 'https://su.imgix.net/';

function Image(props) {
  return <Imgix precision={20} {...props} src={`${ENDPOINT}/${props.src}`} />;
}

export default Image;
