import React from 'react';
import parse from 'url-parse';
import formatDistance from 'date-fns/formatDistance';
import isSameDay from 'date-fns/isSameDay';
import Logotype from '../../img/logotype';
import { AspectRatio, OneImage } from '../OneImage';
import { COLORS } from '@ussu/basil/src/style';
import { type, Typeface, TypeSize } from '@ussu/basil/src/style/type';
import { cardActionable, contentCard } from '@ussu/basil/src/style/cards';

export interface NewsItem {
  id: number;
  title: string;
  link: string;
  publishedDate: Date | null;
  led: string;
  imageURL?: string;
}

interface IProps {
  item: NewsItem;
}

export const NewsBlock: React.FC<IProps> = ({
  item: { title, link, publishedDate, led, imageURL },
}) => (
  <li
    className="NewsGrid__item"
    css={{
      marginBottom: '1rem',
      display: 'flex',
      flexDirection: 'column',
      background: '#ffffff',
    }}
  >
    <a
      css={[
        cardActionable,
        contentCard,
        {
          textDecoration: 'none',
          display: 'flex',
          flex: 'auto',
          color: COLORS.GREY_SLATE,
          flexDirection: 'column',
        },
      ]}
      href={link}
    >
      <div
        css={{
          marginBottom: '0.5rem',
        }}
      >
        {imageURL ? (
          <OneImage
            src={parse(imageURL).pathname.slice(1)}
            aspectRatio={AspectRatio.r16by9}
            alt={''}
            mslResource
          />
        ) : (
          <div className="u-responsive-ratio u-responsive-ratio--r16by9">
            <div
              css={{
                background: COLORS.BRAND_GREEN,
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,

                '& svg': {
                  width: '100%',
                  height: '100%',
                  display: 'block',
                },
              }}
            >
              <Logotype />
            </div>
          </div>
        )}
      </div>

      <div
        css={{
          padding: '0 0.5rem',
          flexDirection: 'column',
          display: 'flex',
          flex: 'auto',
        }}
      >
        <div
          css={{
            textDecoration: 'none',
            paddingRight: '1rem',
          }}
        >
          <span
            css={{
              padding: '0.02em 0.2em',
              color: '#000',
              display: 'inline',
              position: 'relative',
              margin: 0,
              fontWeight: 600,
              ...type(TypeSize.GreatPrimer, Typeface.Secondary),
            }}
          >
            {title}
          </span>
        </div>
        <p
          css={{
            display: 'block',
            color: '#000000',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            ...type(TypeSize.LongPrimer, Typeface.Primary),
          }}
        >
          {led}
        </p>
        <div
          css={{
            ...type(TypeSize.Brevier),
            padding: '0.2rem 0',
            margin: '0.2rem 0',
            marginTop: 'auto',

            '&:before': {
              content: '',
              position: 'relative',
              display: 'block',
              width: 30,
              height: 3,
              background: COLORS.BRAND_RED,
              margin: '0.2rem 0',
              marginTop: 'auto',
            },
          }}
        >
          {publishedDate ? (
            <time className="NewsBlock__date">
              {isSameDay(publishedDate, new Date())
                ? 'Today'
                : `${formatDistance(publishedDate, new Date())} ago`}
            </time>
          ) : null}
        </div>
      </div>
    </a>
  </li>
);
