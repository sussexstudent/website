import React from 'react';
import FauxLink from '../../../FauxLink';
import { SlateBox } from '@ussu/common/src/types/slates';
import { FalmerImage } from '@ussu/common/src/types/events';
import { type, Typeface, TypeSize } from '@ussu/common/src/libs/style/type';
import { COLORS } from '@ussu/common/src/libs/style';
import { SlateBoxBackground, SlateBoxContainer } from '../../Box';
import { css } from '@emotion/core';

interface IProps {
  title: string;
  description: string;
  link: string;
  backgroundImage: FalmerImage;
}

const headingContainerStyle = css({
  padding: '1rem',
  paddingTop: 230,
});

const headingTitle = css({
  ...type(TypeSize.Canon, Typeface.Secondary),
  boxDecorationBreak: 'clone',
  padding: '0 0.2rem',
  backgroundColor: COLORS.BRAND_YELLOW,
  fontWeight: 'bold',
  color: '#000000',
  display: 'inline',
  position: 'relative',
  lineHeight: 1,
  clear: 'right',
});

const headingDescription = css({
  ...type(TypeSize.Pica, Typeface.Secondary),
  display: 'inline-block',
  fontWeight: 'bold',
  backgroundColor: COLORS.BRAND_YELLOW,
  color: '#000000',
  maxWidth: 550,
  padding: '0 0.2rem',
  marginTop: -2,
});

const component: React.FC<IProps> = ({
  link,
  title,
  description,
  backgroundImage,
}) => {
  return (
    <SlateBoxContainer>
      <SlateBoxBackground src={backgroundImage.resource}>
        <FauxLink href={link} />
        <div css={headingContainerStyle}>
          <h1 css={headingTitle}>{title}</h1>
          {description ? (
            <div>
              <div css={headingDescription}>{description}</div>
            </div>
          ) : null}
        </div>
      </SlateBoxBackground>
    </SlateBoxContainer>
  );
};

export const SlateBoxSimpleText: SlateBox = {
  component,
  schema: {
    type: 'object',
    required: ['title', 'description', 'backgroundImage', 'link'],
    properties: {
      title: { type: 'string', title: 'Title', default: '' },
      description: { type: 'string', title: 'Description', default: '' },
      backgroundImage: {
        type: 'number',
        title: 'Background image',
        default: null,
      },
      link: { type: 'string', title: 'Link', default: '' },
    },
  },
  uiSchema: {
    backgroundImage: {
      'ui:widget': 'FalmerImage',
    },
  },
  displayName: 'SimpleText',
  category: 'banner',
};
