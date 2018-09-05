import React from 'react';
import { Page, StreamFieldData } from '~website/containers/content/types';
import { FalmerImage } from '~types/events';
import StreamField from '~website/containers/content/StreamField';
import ContentCard from '~components/ContentCard';
import { OneImageBackground } from '~components/OneImage';
import {
  OpeningTimeData,
  openingTimesBlockParser,
} from '~libs/streamFieldStructures';
import { Sectionbar, SectionbarItem } from '~components/Sectionbar';
import { Link } from 'react-router-dom';

interface IOutletIndex extends Page<Page[]> {}

interface IOutletPage extends Page {
  main: StreamFieldData;
  heroImage: FalmerImage;
  openingTimes: StreamFieldData;
  menu: StreamFieldData;
  deals: StreamFieldData;

  section: IOutletIndex;
}

interface OutletPageProps {
  page: IOutletPage;
}

function OpeningTimesCard({
  openingTimes,
}: {
  openingTimes: OpeningTimeData | null;
}) {
  if (!openingTimes) {
    return null;
  }

  return (
    <ContentCard>
      <h3>Opening Times</h3>
      <ul>
        {openingTimes.times.map((time) => (
          <li>{time}</li>
        ))}
      </ul>
    </ContentCard>
  );
}

export const OutletPage: React.SFC<OutletPageProps> = ({ page }) => (
  <div>
    <Sectionbar title={page.section.title} titleLink={page.section.path}>
      {page.section.subPages.map((page) => (
        <SectionbarItem key={page.path}>
          <Link to={page.path}>{page.title}</Link>
        </SectionbarItem>
      ))}
    </Sectionbar>
    <OneImageBackground
      className="Layout--content-top-bleed"
      src={
        'original_images/0d329172c2604133b4559d6e953a7ea5' ||
        page.heroImage.resource
      }
    >
      <div className="LokiContainer">
        <h1>{page.title}</h1>
      </div>
    </OneImageBackground>

    <div className="LokiContainer">
      <div className="Layout Layout--sidebar-right">
        <div>
          <StreamField page={page} items={page.main} />
        </div>
        <aside>
          <OpeningTimesCard
            openingTimes={openingTimesBlockParser(page.openingTimes)}
          />
          <ContentCard>
            <h3>Menus</h3>
            <StreamField page={page} items={page.menu} />
          </ContentCard>
          <ContentCard>
            <h3>Deals</h3>
            <StreamField page={page} items={page.deals} />
          </ContentCard>
        </aside>
      </div>
    </div>
  </div>
);
