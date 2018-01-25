import React from 'react';
import renderer from 'react-test-renderer';

import {AspectRatio, OneImage, OneImageBackground} from './index';

it('renders a snapshot', () => {
  const tree = renderer.create((
    <OneImage
      aspectRatio={AspectRatio.r16by9}
      src="original_images/4219b2966c1047dd8fe4bfa2aa922c72"
      alt="Building"
    />
  )).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders using custom dimensions', () => {
  const tree = renderer.create((
    <OneImage
      aspectRatio={{ width: 100, height: 50 }}
      src="original_images/4219b2966c1047dd8fe4bfa2aa922c72"
      alt="Building"
    />
  )).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders using custom widths', () => {
  const tree = renderer.create((
    <OneImage
      aspectRatio={AspectRatio.r1by1}
      src="original_images/4219b2966c1047dd8fe4bfa2aa922c72"
      alt="Building"
      sizes={[300, 200, 600]}
    />
  )).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders using custom options', () => {
  const tree = renderer.create((
    <OneImage
      aspectRatio={AspectRatio.r1by1}
      src="original_images/4219b2966c1047dd8fe4bfa2aa922c72"
      alt="Building"
      options={{ crop: 'entropy', sat: -100 }}
    />
  )).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with MSL source image', () => {
  const tree = renderer.create((
    <OneImage
      aspectRatio={AspectRatio.r1by1}
      src="asset/News/6412/unnamed.jpg"
      alt="Building"
      mslResource
    />
  )).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders without container', () => {
  const tree = renderer.create((
    <OneImage
      aspectRatio={AspectRatio.r1by1}
      src="original_images/4219b2966c1047dd8fe4bfa2aa922c72"
      alt="Building"
      withoutContainer
    />
  )).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders without lazy', () => {
  const tree = renderer.create((
    <OneImage
      aspectRatio={AspectRatio.r1by1}
      src="original_images/4219b2966c1047dd8fe4bfa2aa922c72"
      alt="Building"
      withoutLazy
    />
  )).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders as background', () => {
  const tree = renderer.create((
    <OneImageBackground
      aspectRatio={AspectRatio.r1by1}
      src="original_images/4219b2966c1047dd8fe4bfa2aa922c72"
    />
  )).toJSON();
  expect(tree).toMatchSnapshot();
});
