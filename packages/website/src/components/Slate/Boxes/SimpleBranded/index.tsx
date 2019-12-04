import React from 'react';
import FauxLink from '../../../FauxLink';
import { OneImage } from '../../../OneImage';
import { SlateBox } from '@ussu/common/src/types/slates';
import { FalmerImage } from '@ussu/common/src/types/events';
import { SlateBoxBackground, SlateBoxContainer } from '../../Box';

interface SimpleProps {
  srt: string;
  link: string;
  foregroundImage: FalmerImage;
  backgroundImage: FalmerImage;
}

const component: React.FC<SimpleProps> = ({
  link,
  srt,
  backgroundImage,
  foregroundImage,
}) => {
  return (
    <SlateBoxContainer>
      <SlateBoxBackground src={backgroundImage.resource}>
        <FauxLink href={link} />
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            display: 'block',
            margin: '0 auto',
            padding: '1rem',
          }}
        >
          <OneImage
            src={foregroundImage.resource}
            aspectRatio={{
              width: foregroundImage.width,
              height: foregroundImage.height,
            }}
            alt={srt}
          />
        </div>
      </SlateBoxBackground>
    </SlateBoxContainer>
  );
};

export const SlateBoxSimpleBranded: SlateBox = {
  component,
  schema: {
    type: 'object',
    required: ['srt', 'foregroundImage', 'backgroundImage', 'link'],
    properties: {
      srt: { type: 'string', title: 'Screen reader text', default: '' },
      foregroundImage: {
        type: 'number',
        title: 'Foreground image',
        default: null,
      },
      backgroundImage: {
        type: 'number',
        title: 'Background image',
        default: null,
      },
      link: { type: 'string', title: 'Link', default: '' },
    },
  },
  uiSchema: {
    foregroundImage: {
      'ui:widget': 'FalmerImage',
    },
    backgroundImage: {
      'ui:widget': 'FalmerImage',
    },
  },
  displayName: 'SimpleBranded',
  category: 'banner',
};
