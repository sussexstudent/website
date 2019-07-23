import React from 'react';
import { StreamFieldBlock, StreamFieldBlockData } from '../types';

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
  'two_col_slice_component',
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

export const ProfileSlice: StreamFieldBlock<ProfileSliceData> = ({
  block: { title },
}) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export const TwoColSlice: StreamFieldBlock<TwoColSliceData> = ({
  block: { title },
}) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};
