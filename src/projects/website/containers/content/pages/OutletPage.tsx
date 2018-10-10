import React from 'react';
import { Page, StreamFieldData } from '~website/containers/content/types';
import { FalmerImage } from '~types/events';
import StreamField from '~website/containers/content/StreamField';
import ContentCard from '~components/ContentCard';
import { OneImageBackground } from '~components/OneImage';
import { openingTimesBlockParser } from '~libs/streamFieldStructures';
import { Sectionbar, SectionbarItem } from '~components/Sectionbar';
import { Link } from 'react-router-dom';
import { cx, css } from 'emotion';
import {
  isOpenNow,
  OpeningTimeInterval,
  parseOpeningTimesToIntervals,
} from '~libs/openingTimes';
import { format } from 'date-fns';
import minimalisticTimeRenderer from '~libs/minimalisticTimeRenderer';
import convert from 'htmr';

interface IOutletIndex extends Page<Page[]> {}

interface IOutletPage extends Page {
  main: StreamFieldData;
  heroImage: FalmerImage;
  openingTimes: StreamFieldData;
  menu: StreamFieldData;
  deals: StreamFieldData;

  googleMapsPlaceId: string;
  contactDetails: string;

  section: IOutletIndex;
}

interface OutletPageProps {
  page: IOutletPage;
}

function OpeningTimesCard({
  openingTimes,
}: {
  openingTimes: OpeningTimeInterval[];
}) {
  return (
    <ContentCard>
      <h3>Opening Times</h3>
      <ul>
        {openingTimes.map((interval) => (
          <li>
            {format(interval.start, 'eeee ')}{' '}
            {minimalisticTimeRenderer(interval.start)} -{' '}
            {minimalisticTimeRenderer(interval.end)}
          </li>
        ))}
      </ul>
    </ContentCard>
  );
}

const heroContainerStyles = css({
  color: '#ffffff',
  alignSelf: 'flex-end',
  width: '100%',
  paddingTop: '6rem',
  background: `linear-gradient(
    to bottom,
    hsla(0, 0%, 8%, 0) 0%,
    hsla(0, 0%, 8%, 0.01) 8.1%,
    hsla(0, 0%, 8%, 0.038) 15.5%,
    hsla(0, 0%, 8%, 0.081) 22.5%,
    hsla(0, 0%, 8%, 0.137) 29%,
    hsla(0, 0%, 8%, 0.202) 35.3%,
    hsla(0, 0%, 8%, 0.275) 41.2%,
    hsla(0, 0%, 8%, 0.351) 47.1%,
    hsla(0, 0%, 8%, 0.429) 52.9%,
    hsla(0, 0%, 8%, 0.505) 58.8%,
    hsla(0, 0%, 8%, 0.578) 64.7%,
    hsla(0, 0%, 8%, 0.643) 71%,
    hsla(0, 0%, 8%, 0.699) 77.5%,
    hsla(0, 0%, 8%, 0.742) 84.5%,
    hsla(0, 0%, 8%, 0.77) 91.9%,
    hsla(0, 0%, 8%, 0.78) 100%
  )`,
});

const headerStyles = css({
  height: '30vh',
  minHeight: 400,
  paddingTop: '2rem',
  marginBottom: '2rem',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
});

export const OutletPage: React.SFC<OutletPageProps> = ({ page }) => {
  const openingTimes = openingTimesBlockParser(page.openingTimes);
  const openingTimesIntervals = parseOpeningTimesToIntervals(
    openingTimes ? openingTimes.times : [],
  );

  return (
    <div>
      <Sectionbar title={page.section.title} titleLink={page.section.path}>
        {page.section.subPages.map((page) => (
          <SectionbarItem key={page.path}>
            <Link to={page.path}>{page.title}</Link>
          </SectionbarItem>
        ))}
      </Sectionbar>
      <OneImageBackground
        className={cx('Layout--content-top-bleed', headerStyles)}
        src={page.heroImage.resource}
      >
        <div className={heroContainerStyles}>
          <div className={cx('LokiContainer')}>
            <h1>{page.title}</h1>
            <h2>{isOpenNow(openingTimesIntervals) ? 'Open now' : 'Closed'}</h2>
          </div>
        </div>
      </OneImageBackground>

      <div className="LokiContainer">
        <div className="Layout Layout--sidebar-right">
          <div>
            <div className="type-body-copy">
              <StreamField page={page} items={page.main} />
            </div>
            <div
              className={cx(
                'Trail',
                page.contactDetails !== '' && page.googleMapsPlaceId !== ''
                  ? 'Trail__row--11'
                  : '',
              )}
            >
              {page.googleMapsPlaceId !== '' && (
                <div>
                  <h4>Find us</h4>
                  <iframe
                    width="100%"
                    height="400"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBIl5pxXAz1mDL3BBYocb_pWOMkLcaJDMk&q=place_id:${
                      page.googleMapsPlaceId
                    }`}
                    frameBorder="0"
                  />
                </div>
              )}
              {page.contactDetails !== '' && (
                <div>
                  <h4>Contact us</h4>
                  {convert(page.contactDetails)}
                </div>
              )}
            </div>
          </div>
          <aside>
            <OpeningTimesCard openingTimes={openingTimesIntervals} />

            {page.menu.length > 0 && (
              <ContentCard>
                <h3>Menus</h3>
                <StreamField page={page} items={page.menu} />
              </ContentCard>
            )}

            {page.deals.length > 0 && (
              <ContentCard>
                <h3>Deals</h3>
                <StreamField page={page} items={page.deals} />
              </ContentCard>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
