import React from 'react';
import { Page, StreamFieldData } from '../types';
import { Sectionbar, SectionbarItem } from '../../../components/Sectionbar';
import { Link } from 'react-router-dom';
import { AspectRatio, OneImage } from '@ussu/website/src/components/OneImage';
import { FalmerImage } from '@ussu/common/src/types/events';
import convert from 'htmr';
import StreamField from '../../content/StreamField';
import cx from 'classnames';
import { css } from '@emotion/core';
import { MQ } from '@ussu/common/src/libs/style';

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
  manifestoTagline: string;
  manifestoOverview: string;
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
  }
});

const socialItemsStyles = css({
  [MQ.Medium]: {
    justifyContent: 'flex-end',
  },
});

const videoStyle = css({
  margin: '10% auto',
  width: '90%',
})

export const OfficerOverviewPage: React.FC<OfficerOverviewPageProps> = ({ page }) => {

  return (
    <div>
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
            alt=""
            />
          </div>
          <div>
            <h2>{page.role}</h2>
            <h1>{page.firstName} {page.lastName}</h1>
            <div className="type-body-copy">
              {convert(page.roleDescription)}
            </div>
            {/* SOCIAL MEDIA SECTION */}
            <div css={socialStyles}>
              <h4>{'Follow ' + page.firstName }</h4>
              <ul className={cx('Social')} css={socialItemsStyles}>
                {page.twitterUsername ? (
                  <li>
                    <a className="Social__link" href={'https://twitter.com/' + page.twitterUsername}>
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
          </div>
        </div>
          <div className="u-responsive-ratio u-responsive-ratio--r16by9" css={videoStyle}>
            <iframe
              className="u-responsive-inner"
              src="https://www.youtube-nocookie.com/embed/R1KRavrc3wM?rel=0&amp;controls=0&amp;showinfo=0"
              frameBorder="0"
              allowFullScreen
            />
          </div>
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
