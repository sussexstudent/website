import React from 'react';
import { Page, StreamFieldData } from '../types';
import StreamField from '../../content/StreamField';
import { FalmerImage } from '@ussu/common/src/types/events';
import { Link } from 'react-router-dom';
import { Sectionbar, SectionbarItem } from '../../../components/Sectionbar';
import { OneImageBackground } from '../../../components/OneImage';
import { Typeface, TypeSize, type } from '@ussu/common/src/libs/style/type';
import { css } from '@emotion/core';

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

const backgroundStyles = css({
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
});

const heroContainerStyles = css({
  color: '#ffffff',
  alignSelf: 'flex-end',
  width: '100%',
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
  padding: '1rem',
  paddingTop: '6rem',
  textDecoration: 'none',
  display: 'block',
});

const titleStyles = css({
  color: '#fff',
  ...type(TypeSize.DoublePica, Typeface.Secondary),
});

export const OutletIndexPage: React.FC<OutletIndexPageProps> = ({ page }) => (
  <React.Fragment>
    <Sectionbar title={page.section.title} titleLink={page.section.path}>
      {page.section.subPages.map((page) => (
        <SectionbarItem key={page.path}>
          <Link to={page.path}>{page.title}</Link>
        </SectionbarItem>
      ))}
    </Sectionbar>
    <div className="LokiContainer">
      <div className="type-body-copy">
        <StreamField page={page} items={page.preamble} />
      </div>
      <ul className="List--reset">
        {page.subPages.map((page) => (
          <div
            css={{
              marginBottom: '1rem',
            }}
            key={page.path}
          >
            <OneImageBackground
              src={page.heroImage.resource}
              css={backgroundStyles}
            >
              <Link css={heroContainerStyles} to={page.path}>
                <h3 css={titleStyles}>{page.title}</h3>
              </Link>
            </OneImageBackground>
          </div>
        ))}
      </ul>
    </div>
  </React.Fragment>
);
