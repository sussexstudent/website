import React from 'react';
import { Page, StreamFieldData } from '../types';
import { FalmerImage } from '@ussu/common/src/types/events';
import StreamField from '../StreamField';
import { ContentCard } from '../../../components/ContentCard';
import { OneImageBackground } from '../../../components/OneImage';
import { openingTimesBlockParser } from '@ussu/common/src/libs/streamFieldStructures';
import {
  isOpenNow,
  OpeningTimeInterval,
  parseOpeningTimesToIntervals,
} from '@ussu/common/src/libs/openingTimes';
import { format } from 'date-fns';
import minimalisticTimeRenderer from '@ussu/common/src/libs/minimalisticTimeRenderer';
import convert from 'htmr';
import { css } from '@emotion/core';
import classnames from 'classnames';
import { Heading, HeadingLevel } from '../../../components/Heading';
import { type, TypeSize } from '@ussu/basil/src/style/type';
import {
  CardListActionable,
  CardListActionableDocumentLink,
} from '../../../components/CardListActionable';

type IOutletIndex = Page<Page[]>;

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

export interface OutletPageProps {
  page: IOutletPage;
}

const OpeningTimesCard = ({
  openingTimes,
}: {
  openingTimes: OpeningTimeInterval[];
}) => (
  <ContentCard>
    <Heading level={HeadingLevel.h3} size={TypeSize.GreatPrimer}>
      Opening Times
    </Heading>
    <table
      css={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
      }}
    >
      <tbody>
        {openingTimes.map((interval) => (
          <tr
            key={format(interval.start, 'eeee ')}
            css={{ marginBottom: '0.2rem', ...type(TypeSize.LongPrimer) }}
          >
            <td css={{ fontWeight: 'bold' }}>
              {format(interval.start, 'eeee ')}
            </td>
            <td>
              {minimalisticTimeRenderer(interval.start)} -{' '}
              {minimalisticTimeRenderer(interval.end)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </ContentCard>
);

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

export const OutletPage: React.FC<OutletPageProps> = ({ page }) => {
  const openingTimes = openingTimesBlockParser(page.openingTimes);
  const openingTimesIntervals = parseOpeningTimesToIntervals(
    openingTimes ? openingTimes.times : [],
  );

  return (
    <div>
      <OneImageBackground
        className={'Layout--content-top-bleed'}
        css={headerStyles}
        src={page.heroImage.resource}
      >
        <div css={heroContainerStyles}>
          <div className={'LokiContainer'}>
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
              className={classnames(
                'Trail',
                page.contactDetails !== '' && page.googleMapsPlaceId !== ''
                  ? 'Trail__row--11'
                  : '',
              )}
            >
              {page.googleMapsPlaceId !== '' && (
                <div>
                  <Heading level={HeadingLevel.h4} size={TypeSize.LongPrimer}>
                    Find us
                  </Heading>
                  <iframe
                    width="100%"
                    height="400"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBIl5pxXAz1mDL3BBYocb_pWOMkLcaJDMk&q=place_id:${page.googleMapsPlaceId}`}
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
                <Heading level={HeadingLevel.h3} size={TypeSize.GreatPrimer}>
                  Menus
                </Heading>
                <CardListActionable>
                  <StreamField
                    page={page}
                    items={page.menu}
                    components={{
                      document_link: CardListActionableDocumentLink,
                    }}
                  />
                </CardListActionable>{' '}
              </ContentCard>
            )}

            {page.deals.length > 0 && (
              <ContentCard>
                <Heading level={HeadingLevel.h3} size={TypeSize.GreatPrimer}>
                  Deals
                </Heading>
                <StreamField page={page} items={page.deals} />
              </ContentCard>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
