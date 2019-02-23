import React from 'react';
import FauxLink from '~components/FauxLink';
import { OneImage, OneImageBackground } from '~components/OneImage';
import { SlateBox } from '~types/slates';
import { FalmerImage } from '~types/events';

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
    <div className="BentoBox">
      <OneImageBackground
        className="BentoBox__background-image"
        src={backgroundImage.resource}
      >
        <FauxLink href={link} />
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            display: 'block',
            margin: '0 auto',
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
      </OneImageBackground>
    </div>
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
