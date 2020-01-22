import React, { useRef, useLayoutEffect } from 'react';
import classToggle from '@ussu/common/src/libs/dom/classToggle';
import { omit } from 'lodash';

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

interface OneImageProps extends React.HTMLAttributes<HTMLImageElement> {
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

function aspectMultiplier(
  aspectRatio: AspectRatioInput,
  width: number,
): number {
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

function createQueryString(obj: { [key: string]: string | number }): string {
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
): string {
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

const OneImage: React.FC<OneImageProps> = (props) => {
  const containerRef = useRef<null | HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current !== null) {
      classToggle(containerRef.current, 'lazyloaded', false);
      classToggle(containerRef.current, 'lazyload', true);
    }
  }, [props.src]);

  const { withoutContainer, className, mediaSizes, aspectRatio } = props;
  const sizes = props.sizes ?? defaultSizes;

  const img = (
    <img
      className={`ResponsiveImage lazyload ${className}`}
      src={generateUrl(props, { width: sizes[0] })}
      data-sizes={mediaSizes ?? 'auto'}
      ref={containerRef}
      srcSet="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
      data-srcset={sizes.map(
        (width: number) => `${generateUrl(props, { width })} ${width}w`,
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
            paddingBottom: `${(aspectRatio.height / aspectRatio.width) * 100}%`,
          },
        };

  return <div {...containerProps}>{img}</div>;
};

export interface OneImageBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: AspectRatioInput;
  src: string;
  mslResource?: boolean;
}

const OneImageBackground: React.FC<OneImageBackgroundProps> = (props) => {
  const containerRef = useRef<null | HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current !== null) {
      classToggle(containerRef.current, 'lazyloaded', false);
      classToggle(containerRef.current, 'lazyload', true);
    }
  }, [props.src]);

  return (
    <div
      {...omit(props, ['aspectRatio', 'src', 'mslResource'])} // todo
      className={`lazyload ${props.className}`}
      ref={containerRef}
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
