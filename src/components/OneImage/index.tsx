import React from 'react';

const FALMER_ENDPOINT = 'https://su.imgix.net/';
const MSL_ENDPOINT = 'https://ussu.imgix.net/';

export enum AspectRatio {
  r16by9 = 'r16by9',
  r20by9 = 'r20by9',
  r1by1 = 'r1by1',
}

const aspectRatioMap = {
  [AspectRatio.r1by1]: 1.0,
  [AspectRatio.r16by9]: 0.5625,
  [AspectRatio.r20by9]: 0.45,
};

interface IProps {
  aspectRatio: AspectRatio;
  src: string;
  alt: string;
  withoutLazy?: boolean; // todo
  withoutContainer?: boolean;
  mslResource?: boolean;
}

function aspectMultiplier(aspectRatio: AspectRatio, width: number) {
  return width * aspectRatioMap[aspectRatio];
}

function generateUrl(props: IProps, opts: { width: number }) {
  return `${props.mslResource ? MSL_ENDPOINT : FALMER_ENDPOINT}${props.src}?w=${opts.width}&h=${aspectMultiplier(props.aspectRatio, opts.width)}&crop=faces&fit=crop`;
}

const widths = [160, 320, 640, 1280];

const OneImage: React.SFC<IProps>  = (props) => {
  const img = <img
    className="ResponsiveImage lazyload"
    src={generateUrl(props, {width: 100})}
    data-sizes="auto"
    srcSet="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
    data-srcset={widths.map(width => `${generateUrl(props, {width: width})} ${width}w`)}
  />;

  if (props.withoutContainer) {
    return img;
  }

  return (
    <div className={`u-responsive-ratio u-responsive-ratio--${props.aspectRatio}`}>
      {img}
    </div>
  );
};

export { OneImage };
