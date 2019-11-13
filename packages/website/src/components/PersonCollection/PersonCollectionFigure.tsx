import React from 'react';
import { OneImage, AspectRatio } from '../OneImage';
import { COLORS } from '@ussu/common/src/libs/style';
import { css } from '@emotion/core';

interface IProps {
  imageResource: string;
  title: string;
  sub: string;
  link: string;
}

export interface FigureData {
  imageResource: string;
  title: string;
  sub: string;
  link: string;
}

const baseText = css({
  paddingLeft: '0.2rem',
  paddingRight: '0.2rem',
  fontWeight: 'bold',
  textAlign: 'center',
});

export const PersonCollectionFigure = ({
  imageResource,
  title,
  sub,
  link,
}: IProps) => (
  <li
    css={{
      width: 200,
      flex: 'none',
      marginRight: '1rem',
    }}
  >
    <a
      href={link}
      css={{
        display: 'block',
        marginBottom: '1rem',
        color: 'black',
        textDecoration: 'none',
        width: '100%',
      }}
    >
      <div
        css={{
          width: '90%',
          display: 'block',
          margin: '0 auto',
        }}
      >
        <OneImage
          css={{
            borderRadius: '50%',
          }}
          alt=""
          aspectRatio={AspectRatio.r1by1}
          src={imageResource}
        />
      </div>
      <span
        css={[
          baseText,
          {
            paddingTop: '0.4rem',
            display: 'block',
            boxSizing: 'border-box',
            color: COLORS.GREY_SLATE,
          },
        ]}
      >
        {title}
      </span>
      <span
        css={[
          baseText,
          {
            display: 'block',
            color: COLORS.GREY_WINTER,
          },
        ]}
      >
        {sub}
      </span>
    </a>
  </li>
);
