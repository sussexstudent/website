import React from 'react';
import classToggle from '~libs/dom/classToggle';
import * as ReactDOM from 'react-dom';

const FALMER_ENDPOINT = 'https://su.imgix.net/';
const MSL_ENDPOINT = 'https://ussu.imgix.net/';

export enum AspectRatio {
  r16by9 = 'r16by9',
  r20by9 = 'r20by9',
  r1by1 = 'r1by1',
  r3by4 = 'r3by4',
}

const aspectRatioMap = {
  [AspectRatio.r1by1]: 1.0,
  [AspectRatio.r16by9]: 0.5625,
  [AspectRatio.r20by9]: 0.45,
  [AspectRatio.r3by4]: 1.333333333,
};

type AspectRatioInput = AspectRatio | { width: number; height: number };

interface ImageOptions {
  [optionName: string]: number | string;
}

interface IProps extends React.HTMLAttributes<HTMLImageElement> {
  aspectRatio: AspectRatioInput;
  src: string;
  alt: string;
  withoutLazy?: boolean; // todo
  withoutContainer?: boolean;
  mslResource?: boolean;
  options?: ImageOptions;
  sizes?: number[];
  mediaSizes?: string;
}

function aspectMultiplier(aspectRatio: AspectRatioInput, width: number) {
  if (typeof aspectRatio === 'string') {
    return width * aspectRatioMap[aspectRatio];
  }

  return width * (aspectRatio.height / aspectRatio.width);
}

const defaultOptions = {
  auto: 'format',
  q: 80,
  fit: 'crop',
  crop: 'faces',
};

function createQueryString(obj: { [key: string]: any }) {
  return Object.entries(obj)
    .map((pair) => pair.join('='))
    .join('&');
}

function generateUrl(
  props: {
    src: string;
    aspectRatio?: AspectRatioInput;
    mslResource?: boolean;
    options?: ImageOptions;
  },
  opts: { width: number },
) {
  if (!props.aspectRatio) {
    return `${props.mslResource ? MSL_ENDPOINT : FALMER_ENDPOINT}${
      props.src
    }?w=${opts.width}`;
  }
  return `${props.mslResource ? MSL_ENDPOINT : FALMER_ENDPOINT}${props.src}?w=${
    opts.width
  }&h=${aspectMultiplier(props.aspectRatio, opts.width)}&${createQueryString(
    props.options ? { ...defaultOptions, ...props.options } : defaultOptions,
  )}`;
}

const defaultSizes = [
  960,
  240,
  320,
  480,
  624,
  800,
  1024,
  1152,
  1248,
  1440,
  1680,
];

class OneImage extends React.Component<IProps> {
  componentDidUpdate(prevProps: IProps) {
    if (this.props.src !== prevProps.src) {
      const el = ReactDOM.findDOMNode(this as any);
      classToggle(el, 'lazyloaded', false);
      classToggle(el, 'lazyload', true);
    }
  }

  render() {
    const { withoutContainer, className, mediaSizes, aspectRatio } = this.props;
    const sizes = this.props.sizes || defaultSizes;

    const img = (
      <img
        className={`ResponsiveImage lazyload ${className}`}
        src={generateUrl(this.props, { width: sizes[0] })}
        data-sizes={mediaSizes || 'auto'}
        srcSet="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
        data-srcset={sizes.map(
          (width: number) => `${generateUrl(this.props, { width })} ${width}w`,
        )}
      />
    );

    if (withoutContainer) {
      return img;
    }

    const containerProps =
      typeof aspectRatio === 'string'
        ? {
            className: `u-responsive-ratio u-responsive-ratio--${aspectRatio}`,
          }
        : {
            className: 'u-responsive-ratio',
            style: {
              paddingBottom: `${aspectRatio.height / aspectRatio.width * 100}%`,
            },
          };

    return <div {...containerProps}>{img}</div>;
  }
}

interface IBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: AspectRatioInput;
  src: string;
  mslResource?: boolean;
}

const OneImageBackground: React.SFC<IBackgroundProps> = (props) => {
  return (
    <div
      className={`lazyload ${props.className}`}
      data-sizes="auto"
      data-bgset={defaultSizes.map(
        (width) => `${generateUrl(props, { width })} ${width}w`,
      )}
    >
      {props.children}
    </div>
  );
};

export { OneImage, OneImageBackground };
