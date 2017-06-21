import React from 'react';
import Imgix from 'react-imgix';

const ENDPOINT = 'https://su.imgix.net/';

function Image(props) {
  if (process.env.NODE_ENV === 'test') {
    /*
      TODO: hacky and probally makes tests a bit useless
      all due to findDOMNode in the Imgix component
    */
    return (
      <div className="TEST_IMAGE" data-props={props.src}>
        {props.children ? props.children : null}
      </div>
    );
  }

  return <Imgix precision={20} {...props} src={`${ENDPOINT}/${props.src}`} />;
}

export default Image;
