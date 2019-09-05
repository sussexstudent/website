import React from 'react';
import { Page, StreamFieldData } from '../types';
import { Link } from 'react-router-dom';
import { AspectRatio, OneImage } from '@ussu/website/src/components/OneImage';
import { FalmerImage } from '@ussu/common/src/types/events';
import convert from 'htmr';
import StreamField from '../../content/StreamField';
import { css } from '@emotion/core';
import { MQ } from '@ussu/common/src/libs/style';
import Helmet from 'react-helmet';

interface IOfficerOverviewIndex extends Page<Page[]> {}

interface IOfficerOverviewPage extends Page<Page[]> {
  section: IOfficerOverviewIndex;
  officerImage: FalmerImage;
  role: string;
  roleDescription: string;
  firstName: string;
  lastName: string;
  pledges: StreamFieldData;
  twitterUsername: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeSplash: string;
}

export interface OfficerOverviewPageProps {
  page: IOfficerOverviewPage;
}

const topOverviewStyles = css({
  position: 'relative',
  flexFlow: 'column',
  [MQ.Medium]: {
    flexFlow: 'row',
  },
});

const videoStyle = css({
  margin: '10% auto',
  width: '90%',
});
const youtubeMatcher = /\?v=([A-Za-z0-9-]+)/;

const youtubeId = (url: string): null | string => {
  if (url === null || url === '') {
    return null;
  }

  const match = url.match(youtubeMatcher);
  if (match && match.length > 1) {
    return match[1];
  }

  return null;
};

const OfficerEventPageButton: React.FC<OfficerOverviewPageProps> = ({
  page,
}) => {
  const pagesFilter = page.subPages.filter((page) => page.slug === 'events');

  const eventPage = pagesFilter.length > 0 ? pagesFilter[0] : null;

  if (!eventPage) {
    return null;
  }

  return (
    <div css={{ textAlign: 'center', margin: '2rem' }}>
      <Link className="Button Button--start" to={eventPage.path}>
        Go to {page.title} Events
      </Link>
    </div>
  );
};

export const OfficerOverviewPage: React.FC<OfficerOverviewPageProps> = ({
  page,
}) => {
  const splashYoutubeId = youtubeId(page.youtubeSplash);
  return (
    <div>
      <Helmet title={`${page.role} | ${page.firstName} ${page.lastName}`} />

      <div className="LokiContainer">
        <div className="Layout Layout--sidebar-left" css={topOverviewStyles}>
          <div>
            <OneImage
              aspectRatio={AspectRatio.r1by1}
              src={page.officerImage.resource}
              alt={page.title}
            />
          </div>
          <div>
            <h2>{page.role}</h2>
            <h1>
              {page.firstName} {page.lastName}
            </h1>
            <div className="type-body-copy">
              {convert(page.roleDescription)}
            </div>
            {/* SOCIAL MEDIA SECTION */}
            {page.facebookUrl || page.instagramUrl || page.twitterUsername ? (
              <div>
                <h4>Follow {page.firstName}</h4>
                <ul className="Social">
                  {page.facebookUrl ? (
                    <li>
                      <a className="Social__link" href={page.facebookUrl}>
                        <span className="Social__icon Social__icon--facebook">
                          <span className="u-h">Facebook</span>
                        </span>
                        <span className="Social__handle">Facebook</span>
                      </a>
                    </li>
                  ) : null}

                  {page.instagramUrl ? (
                    <li>
                      <a className="Social__link" href={page.instagramUrl}>
                        <span className="Social__icon Social__icon--instagram">
                          <span className="u-h">Instagram</span>
                        </span>
                        <span className="Social__handle">Instagram</span>
                      </a>
                    </li>
                  ) : null}

                  {page.twitterUsername ? (
                    <li>
                      <a
                        className="Social__link"
                        href={'https://twitter.com/' + page.twitterUsername}
                      >
                        <span className="Social__icon Social__icon--twitter">
                          <span className="u-h">Twitter</span>
                        </span>
                        <span className="Social__handle">
                          {page.twitterUsername || 'Twitter'}
                        </span>
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
        {splashYoutubeId ? (
          <div
            className="u-responsive-ratio u-responsive-ratio--r16by9"
            css={videoStyle}
          >
            <iframe
              className="u-responsive-inner"
              src={`https://www.youtube-nocookie.com/embed/${splashYoutubeId}?rel=0&amp;controls=0&amp;showinfo=0`}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : null}
        {/* PLEDGES SECTION */}
        {page.pledges.length > 0 && (
          <div>
            <h2>Manifesto Points</h2>
            <StreamField page={page} items={page.pledges} />
          </div>
        )}
        <OfficerEventPageButton page={page} />
      </div>
    </div>
  );
};
