import React from 'react';
import FauxLink from '../../../FauxLink';
import { SlateBox } from '@ussu/common/src/types/slates';
import { FalmerImage } from '@ussu/common/src/types/events';
import { SlateBoxContainerStyleable } from '../../Box';
import { InternalAppLink } from '../../../InternalAppLink';
import { type, Typeface, TypeSize } from '@ussu/common/src/libs/style/type';

interface IProps {
  srt: string;
  link: string;
  foregroundImage: FalmerImage;
  backgroundImage: FalmerImage;
}

const component: React.FC<IProps> = ({ link }) => {
  return (
    <SlateBoxContainerStyleable
      css={{
        backgroundColor: '#128fcf',
        backgroundImage: `
        url(${require('../../../../img/freshers-2019/banner-left.svg')}),
        url(${require('../../../../img/freshers-2019/banner-right.svg')}),
        url(${require('../../../../img/freshers-2019/banner-center.svg')})
      `,
        backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
        backgroundSize: 'contain, contain, auto',
        backgroundPosition:
          'left 0 bottom, right 0 bottom, center bottom -30px',
        transition: 'background-position 800ms ease, box-shadow 300ms ease',
        '&:hover': {
          backgroundPosition:
            'left -10px bottom, right -20px bottom, center bottom -25px',
        },
      }}
    >
      <FauxLink href={link} />
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          display: 'block',
          margin: '0 auto',
          padding: '3rem 1rem',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <h1
          css={[
            { textTransform: 'uppercase', fontWeight: 800, marginTop: 0 },
            type(TypeSize.Canon, Typeface.Secondary),
          ]}
        >
          Freshers' Week 2019
        </h1>
        <h2 css={{ fontWeight: 500, marginBottom: '2rem' }}>
          This is the start of your sussex adventure!
        </h2>
        <InternalAppLink
          to={'/freshers'}
          css={{
            textTransform: 'uppercase',
            textDecoration: 'none',
            fontWeight: 600,
            padding: '0.6rem 1.2rem',
            flex: 'none',
            background: '#fff',
            color: '#000',
            borderRadius: '100px',
            display: 'inline-block',
            ':hover': {
              color: '#fff',
              background: '#000',
            },
          }}
        >
          Start here
        </InternalAppLink>
      </div>
    </SlateBoxContainerStyleable>
  );
};

export const SlateBoxFreshers2019: SlateBox = {
  component,
  schema: {
    type: 'object',
    required: ['srt', 'foregroundImage', 'backgroundImage', 'link'],
    properties: {
      heading: { type: 'string', title: 'Heading', default: '' },
      subheading: { type: 'string', title: 'Subheading', default: '' },
      cta: { type: 'string', title: 'Call to action', default: '' },
      link: { type: 'string', title: 'Link', default: '' },
    },
  },
  uiSchema: {},
  displayName: 'Freshers2019',
  category: 'banner',
};
