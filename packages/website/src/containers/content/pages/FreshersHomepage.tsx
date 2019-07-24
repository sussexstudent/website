import React from 'react';
import { NewsletterSignup } from '../../../components/NewsletterSignup';
//import { useCountdown } from '../../../hooks/useCountdown';
import { Page } from '../types';
import StreamField from '../StreamField';
import { ProfileSliceData, TwoColSliceData } from '../blocks/Freshers';
import convert from 'htmr';
import { css } from '@emotion/core';
import UnionLogo from '@ussu/common/src/icons/UnionLogo.svg';
import { SocialArray } from '../../../components/SocialArray';
import { COLORS } from '@ussu/common/src/libs/style';

type FreshersSlices = ProfileSliceData | TwoColSliceData;

interface FreshersHomepagePage extends Page {
  countdownCaption: string;
  countdownTarget: string;
  heroText: string;
  content: FreshersSlices[];
  title: string;
}

interface FreshersHomepageProps {
  page: FreshersHomepagePage;
}

const topSection = css({
  backgroundColor: '#FFC400',
  height: '100%',
});

const topHeader = css({
  display: 'flex',
  justifyContent: 'space-between',
});

const sectionStyle = css({
  padding: '20px 30px',
  color: COLORS.WHITE,
  marginTop: '5%',
});

const freshersTitle = css({
  textTransform: 'uppercase',
  fontSize: '56px !important',
  margin: '0',
  fontWeight: 'normal',
});

const FreshersHomepage: React.FC<FreshersHomepageProps> = ({
  page,
  page: { content },
}) => {
  //const countdown = useCountdown(new Date(2019, 9, 21, 12, 0, 0));

  return (
    <React.Fragment>
      <div className="FreshersHomepage">
        <div className="top-section" css={topSection}>
          <div className="inner-container">
            <div className="top-header" css={topHeader}>
              <div css={{ display: 'flex' }}>
                <div className="social-network">
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
                <a
                  href="/"
                  css={{ color: 'black !important', paddingLeft: '15px' }}
                >
                  Back to the SU Homepage
                </a>
              </div>
              <div className="union-logo">
                <UnionLogo />
              </div>
            </div>

            <div>
              {/*<h1>COMING SOON</h1>
              <div className="FGT__countdown FGT__countdownFreshers">
                <div className="countdown_item">
                  <div className="countdown_value">{countdown.days}</div>
                  <div className="countdown_label">
                    day{countdown.days !== 1 ? 's' : null}
                  </div>
                </div>
                <div className="countdown_item">
                  <div className="countdown_value">{countdown.hours}</div>
                  <div className="countdown_label">
                    hour{countdown.hours !== 1 ? 's' : null}
                  </div>
                </div>
                <div className="countdown_item">
                  <div className="countdown_value">{countdown.minutes}</div>
                  <div className="countdown_label">
                    minute{countdown.minutes !== 1 ? 's' : null}
                  </div>
                </div>
                <div className="countdown_item">
                  <div className="countdown_value">{countdown.seconds}</div>
                  <div className="countdown_label">
                    second{countdown.seconds !== 1 ? 's' : null}
                  </div>
                </div>
              </div>*/}
            </div>

            <div className="top-content" css={sectionStyle}>
              <h2
                css={{
                  fontSize: '20px !important',
                  lineHeight: '30px !important',
                  fontWeight: 'normal',
                }}
              >
                Sussex Students' Union
              </h2>
              <h1 className="title" css={freshersTitle}>
                {page.title}
              </h1>
              <div className="top-description">{convert(page.heroText)}</div>
            </div>
          </div>
        </div>
        <div className="menu-section">
          <div className="menu-content">
            {page.content.length > 0 && (
              <ul
                css={{
                  listStyle: 'none',
                  fontWeight: 'bold',
                  display: 'flex',
                  justifyContent: 'space-around',
                  fontSize: '24px',
                }}
              >
                {page.content.map((item) => (
                  <li
                    key={item.id}
                    css={{ maxWidth: '300px', textAlign: 'center' }}
                  >
                    <a
                      href="#"
                      css={{
                        color: 'black !important',
                        textDecoration: 'none',
                      }}
                    >
                      {item.value.menuName}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <NewsletterSignup />
        </div>
        <div className="slices">
          {page.content.length > 0 && (
            <div>
              <StreamField page={page} items={content} />
            </div>
          )}
        </div>
        <div className="contact"></div>
      </div>
    </React.Fragment>
  );
};

export default FreshersHomepage;
