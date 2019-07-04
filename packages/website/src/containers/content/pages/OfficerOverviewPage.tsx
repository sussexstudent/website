import React from 'react';
import { Page, StreamFieldData } from '../types';
import { Sectionbar, SectionbarItem } from '../../../components/Sectionbar';
import { Link } from 'react-router-dom';
import { AspectRatio, OneImage } from '@ussu/website/src/components/OneImage';
import { FalmerImage } from '@ussu/common/src/types/events';
import convert from 'htmr';
import StreamField from '../../content/StreamField';
import { css } from '@emotion/core';
import { MQ } from '@ussu/common/src/libs/style';
import Helmet from 'react-helmet';

interface IOfficerOverviewIndex extends Page<Page[]> {}

interface IOfficerOverviewPage extends Page {
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

interface OfficerOverviewPageProps {
  page: IOfficerOverviewPage;
}

const topOverviewStyles = css({
  position: 'relative',
  flexFlow: 'column',
  [MQ.Medium]: {
    flexFlow: 'row',
  },
});

const socialStyles = css({
  [MQ.Medium]: {
    position: 'absolute',
    right: '0',
    bottom: '0',
  },
});

const socialItemsStyles = css({
  [MQ.Medium]: {
    justifyContent: 'flex-end',
  },
});

const videoStyle = css({
  margin: '10% auto',
  width: '90%',
});

export const OfficerOverviewPage: React.FC<OfficerOverviewPageProps> = ({
  page,
}) => {
  const match = page.youtubeSplash.match('(?<=v=).([A-Za-z0-9-]+)');
  let videoID = null;
  if (page.youtubeSplash && match) {
    if (match != null && match.length > 0) {
      videoID = match[0];
    }
  }
  return (
    <div>
      <Helmet
        title={`${page.role} | ${page.firstName} ${page.lastName}`}
      ></Helmet>
      <Sectionbar title={page.section.title} titleLink={page.section.path}>
        {page.section.subPages.map((page) => (
          <SectionbarItem key={page.path}>
            <Link to={page.path}>{page.title}</Link>
          </SectionbarItem>
        ))}
      </Sectionbar>

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
              <div css={socialStyles}>
                <h4>{'Follow ' + page.firstName}</h4>
                <ul className="Social" css={socialItemsStyles}>
                  {page.facebookUrl ? (
                    <li>
                      <a className="Social__link" href={page.facebookUrl}>
                        <span className="Social__icon Social__icon--facebook">
                          <span className="u-h">Facebook</span>
                        </span>
                        <span className="Social__handle">
                          {page.facebookUrl || 'Facebook'}
                        </span>
                      </a>
                    </li>
                  ) : null}

                  {page.instagramUrl ? (
                    <li>
                      <a className="Social__link" href={page.instagramUrl}>
                        <span className="Social__icon Social__icon--instagram">
                          <span className="u-h">Instagram</span>
                        </span>
                        <span className="Social__handle">
                          {page.instagramUrl || 'Instagram'}
                        </span>
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
        {page.youtubeSplash ? (
          <div
            className="u-responsive-ratio u-responsive-ratio--r16by9"
            css={videoStyle}
          >
            <iframe
              className="u-responsive-inner"
              src={
                'https://www.youtube-nocookie.com/embed/' +
                videoID +
                '?rel=0&amp;controls=0&amp;showinfo=0'
              }
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
      </div>
    </div>
  );
};
