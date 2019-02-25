import React from 'react';
import FauxLink from '~components/FauxLink';
import { OneImage } from '~components/OneImage';
import { SlateBox } from '~types/slates';
import { FalmerImage } from '~types/events';
import { SlateBoxBackground, SlateBoxContainer } from '~components/Slate/Box';

interface IProps {
  srt: string;
  link: string;
  foregroundImage: FalmerImage;
  backgroundImage: FalmerImage;
}

const component: React.FC<IProps> = ({
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
