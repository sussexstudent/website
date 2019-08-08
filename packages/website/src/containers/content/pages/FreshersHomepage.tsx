import React from 'react';
import { Page } from '../types';
import {
  ProfileSliceData,
  SocialSlice,
  TwoColSliceData,
} from '../blocks/Freshers';
import convert from 'htmr';
import { css, keyframes } from '@emotion/core';
import UnionLogo from '@ussu/common/src/icons/UnionLogo.svg';
import { SocialArray } from '../../../components/SocialArray';
import slugify from '@ussu/common/src/libs/slugify';
import FreshersWeekArt from '../../../icons/freshersWeek2019ArtEdit.svg';
import { type, Typeface, TypeSize } from '@ussu/common/src/libs/style/type';
import StreamField from '../StreamField';
import { COLORS, MQ } from '@ussu/common/src/libs/style';
import { useCountdown } from '../../../hooks/useCountdown';
import sand from '../../../img/freshers-sand.svg';
import { NewsletterSignup } from '../../../components/NewsletterSignup';

type FreshersSlices = ProfileSliceData | TwoColSliceData;

interface FreshersHomepagePage extends Page {
  countdownCaption: string;
  countdownTarget: string;
  heroText: string;
  content: FreshersSlices[];
  title: string;
}

export interface FreshersHomepageProps {
  page: FreshersHomepagePage;
}

const topHeader = css({
  display: 'flex',
  justifyContent: 'space-between',
});

const sectionStyle = css({
  maxWidth: 480,
});

const freshersTitle = css({
  textTransform: 'uppercase',
  margin: '0',
  fontWeight: '600',
  ...type(TypeSize.Canon, Typeface.Secondary),
});

const i360Animation = keyframes`
0% {
  transform: translate(0, 280px);
}

50% {
  transform: translate(0, 10px);
}

100% {
  transform: translate(0, 280px);
}
`;

const FerrisAnimation = keyframes`
0% {
  transform: rotate(0deg);
}

100% {
  transform: rotate(360deg);
}
`;

const desktopOnlyStyle = css({
  display: 'none',
  color: '#000',
  [MQ.Medium]: {
    display: 'block',
  },
});

const DARK_BLUE = '#1e2736';

const FreshersHero: React.FC<{ heroText: string; title: string }> = ({
  heroText,
  title,
}) => {
  return (
    <div
      css={{
        backgroundColor: '#FFC400',
        position: 'relative',
        paddingBottom: '20%',
        overflow: 'hidden',
        color: DARK_BLUE,
        paddingTop: '2rem',
      }}
    >
      <div className="LokiContainer">
        <div css={{ zIndex: 20, position: 'relative' }}>
          <div css={topHeader}>
            <div css={{ display: 'flex' }}>
              <div>
                <SocialArray
                  networks={{
                    instagram: { link: 'https://twitter.com/ussu' },
                    facebook: {
                      link: 'https://www.facebook.com/thestudentsunion/',
                    },
                    twitter: { link: 'https://www.instagram.com/sussexsu/' },
                    linkedin: {
                      link:
                        'https://www.linkedin.com/company/university-of-sussex-students%27-union/',
                    },
                  }}
                />
              </div>
              <a href="/" css={[{ paddingLeft: '15px' }, desktopOnlyStyle]}>
                Back to the SU Homepage
              </a>
            </div>
            <a href="/" css={desktopOnlyStyle}>
              <UnionLogo css={{ width: '100px' }} />
            </a>
          </div>

          <div css={sectionStyle}>
            <h2>{"Sussex Students' Union"}</h2>
            <h1 css={freshersTitle}>{title}</h1>
            <div>{convert(heroText)}</div>
          </div>
        </div>
      </div>
      <div
        css={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          zIndex: 1,
          '& #freshersWeek2019ArtEdit_svg___i360Pod': {
            animation: `${i360Animation} 160s linear infinite`,
          },
          '& #freshersWeek2019ArtEdit_svg___Spokes': {
            transformOrigin: '56.659092px 56.480682px',
            animation: `${FerrisAnimation} 60s linear infinite`,
          },
          '& svg': {
            display: 'block',
          },
        }}
      >
        <FreshersWeekArt />
      </div>
    </div>
  );
};

const FreshersMenu: React.FC<{ content: FreshersSlices[] }> = ({ content }) => (
  <div
    css={{
      background: '#fff',
      top: 0,
      position: 'sticky',
      padding: '1rem 0',
      zIndex: 100,
    }}
  >
    {content.length > 0 && (
      <ul
        css={{
          listStyle: 'none',
          fontWeight: 'bold',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          margin: 0,
          padding: 0,
          ...type(TypeSize.GreatPrimer, Typeface.Secondary),
        }}
      >
        {content.map(({ id, value: { menuName } }) => (
          <li key={id} css={{ textAlign: 'center' }}>
            <a
              href={`#${slugify(menuName)}`}
              css={{
                color: DARK_BLUE,
                textDecoration: 'none',
              }}
            >
              {menuName}
            </a>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const CountdownItem: React.FC<{ value: number; label: string }> = ({
  value,
  label,
}) => (
  <div
    css={{
      flex: '1 0 0',
      paddingBottom: '1rem',
    }}
  >
    <div css={type(TypeSize.Trafalgar, Typeface.Primary)}>{value}</div>
    <div
      css={{
        ...type(TypeSize.DoublePica, Typeface.Secondary),
        textTransform: 'uppcase',
      }}
    >
      {label}
      {value !== 1 ? 's' : null}
    </div>
  </div>
);

const FreshersWater: React.FC<{
  countdownTarget: string;
  countdownCaption: string;
}> = ({ countdownTarget, countdownCaption }) => {
  const countdown = useCountdown(new Date(countdownTarget));
  return (
    <div
      css={{
        backgroundColor: '#0095d8',
        '&:after': {
          content: '""',
          display: 'block',
          backgroundImage: `url(${sand})`,
          backgroundPosition: 'left top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100%',
          height: 150,
        },
      }}
    >
      <div
        css={{
          margin: '0',
          color: 'white',
          textTransform: 'uppercase',
          textAlign: 'center',
          fontWeight: '600',
          ...type(TypeSize.DoublePica, Typeface.Secondary),
          marginBottom: '1rem',
        }}
      >
        {countdownCaption}
      </div>
      <div
        css={{
          textAlign: 'center',
          fontWeight: 'bold',
          maxWidth: '50%',
          margin: '0 auto',
          textTransform: 'uppercase',
          ...type(TypeSize.GreatPrimer, Typeface.Secondary),
          color: COLORS.WHITE,
          display: 'flex',
          flexDirection: 'column',
          [MQ.Medium]: {
            flexDirection: 'row',
          },
        }}
      >
        <CountdownItem value={countdown.days} label="day" />
        <CountdownItem value={countdown.hours} label="hour" />
        <CountdownItem value={countdown.minutes} label="minute" />
        <CountdownItem value={countdown.seconds} label="second" />
      </div>
    </div>
  );
};

export const FreshersHomepage: React.FC<FreshersHomepageProps> = ({
  page,
  page: { heroText, title, content },
}) => {
  return (
    <div className={'FreshersSite'}>
      <FreshersHero title={title} heroText={heroText} />
      <FreshersWater
        countdownTarget={page.countdownTarget}
        countdownCaption={page.countdownCaption}
      />
      <div>
        <FreshersMenu content={content} />
        <NewsletterSignup />
        <StreamField page={page} items={content} />
        <SocialSlice />
      </div>
    </div>
  );
};
