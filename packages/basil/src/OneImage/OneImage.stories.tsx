import { storiesOf } from '@storybook/react';
import {
  AspectRatio,
  OneImage,
} from '@ussu/website/src/components/OneImage/index';

storiesOf('OneImage', module)
  .add('r16by9', () => (
    <OneImage
      aspectRatio={AspectRatio.r16by9}
      src="asset/News/6412/unnamed.jpg"
      alt="Alt text"
      mslResource
    />
  ))
  .add('r1by1', () => (
    <OneImage
      aspectRatio={AspectRatio.r1by1}
      src="asset/News/6412/unnamed.jpg"
      alt="Alt text"
      mslResource
    />
  ))
  .add('r20by9', () => (
    <OneImage
      aspectRatio={AspectRatio.r20by9}
      src="asset/News/6412/unnamed.jpg"
      alt="Alt text"
      mslResource
    />
  ))
  .add('r3by4', () => (
    <OneImage
      aspectRatio={AspectRatio.r3by4}
      src="asset/News/6412/unnamed.jpg"
      alt="Alt text"
      mslResource
    />
  ));
