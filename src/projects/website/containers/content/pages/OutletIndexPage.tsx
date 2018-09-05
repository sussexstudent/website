import React from 'react';
import { Page, StreamFieldData } from '~website/containers/content/types';
import StreamField from '~website/containers/content/StreamField';
import { FalmerImage } from '~types/events';
import { Link } from 'react-router-dom';
import { Sectionbar, SectionbarItem } from '~components/Sectionbar';
import { OneImageBackground } from '~components/OneImage';

interface IOutletIndex extends Page<Page[]> {}

interface OutletPagePreview extends Page {
  heroImage: FalmerImage;
}

interface OutletIndexPage extends Page<OutletPagePreview[]> {
  preamble: StreamFieldData;
  section: IOutletIndex;
}

interface OutletIndexPageProps {
  page: OutletIndexPage;
}

export const OutletIndexPage: React.SFC<OutletIndexPageProps> = ({ page }) => (
  <React.Fragment>
    <Sectionbar title={page.section.title} titleLink={page.section.path}>
      {page.section.subPages.map((page) => (
        <SectionbarItem key={page.path}>
          <Link to={page.path}>{page.title}</Link>
        </SectionbarItem>
      ))}
    </Sectionbar>
    <div className="LokiContainer">
      <StreamField page={page} items={page.preamble} />
      <ul className="List--reset">
        {page.subPages.map((page) => (
          <li key={page.path}>
            <OneImageBackground
              src={
                'original_images/0d329172c2604133b4559d6e953a7ea5' ||
                page.heroImage.resource
              }
            >
              <h3>
                <Link to={page.path}>{page.title}</Link>
              </h3>
            </OneImageBackground>
          </li>
        ))}
      </ul>
    </div>
  </React.Fragment>
);
