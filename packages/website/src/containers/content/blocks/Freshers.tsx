import React from 'react';
import {
  StreamFieldBlock,
  StreamFieldBlockData,
  StreamFieldData,
} from '../types';
import { css } from '@emotion/core';
import slugify from '@ussu/common/src/libs/slugify';
import convert from 'htmr';
import StreamField from '../StreamField';
import { PersonCollection } from '../../../components/PersonCollection';
import { PersonCollectionFigure } from '../../../components/PersonCollection/PersonCollectionFigure';

type Text = StreamFieldBlockData<
  'text',
  {
    value: string;
  }
>;

const sliceStyle = css({
  padding: '1rem 0',
});

const sectionStyle = css({
  padding: '50px 30px',
});

const headingStyle = css({
  margin: 0,
  textAlign: 'center',
  fontSize: '44px !important',
});

const subheadingStyle = css({
  textAlign: 'center',
  fontSize: '40px !important',
});

const descStyle = css({
  textAlign: 'center',
  width: '50%',
  margin: '30px auto',
  fontSize: '20px',
});

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
    colOneContent: StreamFieldData;
  }
>;

export const ProfileSlice: StreamFieldBlock<ProfileSliceData> = ({
  page,
  block: { title, backgroundColor, menuName, description, body, image },
}) => {
  return (
    <div css={[{ backgroundColor: backgroundColor }, sectionStyle]}>
      <h1 css={headingStyle}>{title}</h1>
      <div css={descStyle}>{convert(description)}</div>
      <div css={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div>
          <PersonCollection size="big">
            <PersonCollectionFigure
              key={image.image.id}
              title={image.alternativeTitle}
              sub={image.caption}
              link=""
              imageResource={image.image.resource}
            />
          </PersonCollection>
        </div>
        <div>
          <StreamField page={page} items={body} />
        </div>
      </div>
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
    </div>
  );
};

export const TwoColSlice: StreamFieldBlock<TwoColSliceData> = ({
  page,
  block: {
    title,
    backgroundColor,
    menuName,
    description,
    colOneTitle,
    colOneContent,
    colTwoTitle,
  },
}) => {
  return (
    <div
      css={[{ backgroundColor: backgroundColor }, sectionStyle]}
      id={slugify(menuName)}
    >
      <h1 css={headingStyle}>{title}</h1>
      <div css={descStyle}>{convert(description)}</div>
      <div css={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div>
          <h2 css={subheadingStyle}>{colOneTitle}</h2>
          <div css={{ padding: '20px 10%' }}>
            <StreamField page={page} items={colOneContent} />
          </div>
        </div>
        <div>
          <h2 css={subheadingStyle}>{colTwoTitle}</h2>
          <div css={{ padding: '20px 10%' }}>
            <StreamField page={page} items={colOneContent} />
          </div>
        </div>
      </div>
    </div>
  );
};
