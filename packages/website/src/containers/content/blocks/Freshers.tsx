import React from 'react';
import { StreamFieldBlock, StreamFieldBlockData } from '../types';
import { css } from '@emotion/core';
import slugify from '@ussu/common/src/libs/slugify';

type Text = StreamFieldBlockData<
  'text',
  {
    value: string;
  }
>;

export type ProfileSliceData = StreamFieldBlockData<
  'profile_slice_component',
  {
    backgroundColor: string;
    description: string;
    menuName: string;
    title: string;
    image: any;
    body: Text[];
  }
>;

export type TwoColSliceData = StreamFieldBlockData<
  'two_slice_component',
  {
    backgroundColor: string;
    description: string;
    menuName: string;
    title: string;
    body: Text[];
    colOneTitle: string;
    colTwoTitle: string;
  }
>;

const sliceStyle = css({
  padding: '1rem 0',
});

export const ProfileSlice: StreamFieldBlock<ProfileSliceData> = ({
  block: { title, backgroundColor, menuName },
}) => {
  return (
    <div
      css={[
        sliceStyle,
        {
          background: `#${backgroundColor}`,
        },
      ]}
      id={slugify(menuName)}
    >
      <div className="LokiContainer">
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export const TwoColSlice: StreamFieldBlock<TwoColSliceData> = ({
  block: { title, backgroundColor, menuName },
}) => {
  return (
    <div
      css={[
        sliceStyle,
        {
          background: `#${backgroundColor}`,
        },
      ]}
      id={slugify(menuName)}
    >
      <div className="LokiContainer">
        <h2>{title}</h2>
      </div>
    </div>
  );
};
