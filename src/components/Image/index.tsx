import React from 'react';
import Imgix from 'react-imgix';
import LazyLoad from 'react-lazyload';
import ImagePlaceholder from '../ImagePlaceholder';

const FALMER_ENDPOINT = 'https://su.imgix.net/';
const MSL_ENDPOINT = 'https://ussu.imgix.net/';

interface OwnProps {
  src: string;
  lazy?: boolean;
  mslResource?: boolean;
}

type IProps = OwnProps & any;

const Image: React.SFC<IProps> = (props) => {
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

  const img = (
    <Imgix
      precision={20}
      {...props}
      src={`${props.mslResource ? MSL_ENDPOINT : FALMER_ENDPOINT}/${props.src}`}
    />
  );

  if (props.lazy) {
    return (
      <LazyLoad offset={300} placeholder={<ImagePlaceholder />}>
        {img}
      </LazyLoad>
    );
  }

  return img;
};

Image.defaultProps = {
  lazy: false,
  mslResource: false,
};

export default Image;
