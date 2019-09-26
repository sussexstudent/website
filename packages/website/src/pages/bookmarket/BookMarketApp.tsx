import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Sectionbar, SectionbarItem } from '../../components/Sectionbar';
import { InternalAppLink } from '../../components/InternalAppLink';
import loadable from '@loadable/component';
import { MarketSearchProps } from './MarketSearch';
import { MarketSectionProps } from './MarketSection';
import { BookDetailProps } from './BookDetail';

const LoadableMarketHome = loadable<{}>(async () => {
  const { MarketHome } = await import('./MarketHome');
  return (props) => <MarketHome {...props} />;
});

const LoadableMarketMyListings = loadable<{}>(async () => {
  const { MarketMyListings } = await import('./MarketMyListings');
  return (props) => <MarketMyListings {...props} />;
});

const LoadableMarketSearch = loadable<MarketSearchProps>(async () => {
  const { MarketSearch } = await import('./MarketSearch');
  return (props) => <MarketSearch {...props} />;
});

const LoadableMarketSection = loadable<MarketSectionProps>(async () => {
  const { MarketSection } = await import('./MarketSection');
  return (props) => <MarketSection {...props} />;
});

const LoadableMarketBookDetail = loadable<BookDetailProps>(async () => {
  const { BookDetail } = await import('./BookDetail');
  return (props) => <BookDetail {...props} />;
});

const LoadableMarketCreateListing = loadable(async () => {
  const { CreateListing } = await import('./CreateListing');
  return (props) => <CreateListing {...props} />;
});

export const BookMarketApplication: React.FC<{}> = () => (
  <Route
    path={`/book-market/`}
    component={() => (
      <React.Fragment>
        <Sectionbar title="Book Market">
          <SectionbarItem>
            <InternalAppLink to="/book-market">Home</InternalAppLink>
            {/*<HoverTapTooltip content={"Log in to list books"}>*/}
            {/*{({ ref, handleOpen, handleClose }) => (*/}
            {/*<InternalAppLink to="/book-market/my-listings/" onMouseOver={handleOpen} onMouseLeave={handleClose} innerRef={ref}>Your listings</InternalAppLink>*/}
            {/*)}*/}
            {/*</HoverTapTooltip>*/}
          </SectionbarItem>
        </Sectionbar>
        <div className="LokiContainer">
          <Helmet
            titleTemplate="%s | Book Market | Sussex Students' Union"
            defaultTitle="Book Market | Sussex Students' Union"
          />
          <Switch>
            <Route
              path={`/book-market/`}
              component={LoadableMarketHome}
              exact
            />
            <Route
              path={`/book-market/my-listings`}
              component={LoadableMarketMyListings as any}
            />
            <Route
              path={`/book-market/search`}
              component={LoadableMarketSearch as any}
            />
            <Route
              path={`/book-market/section/:sectionSlug`}
              component={LoadableMarketSection}
            />
            <Route
              path={`/book-market/listing/:listingId`}
              component={LoadableMarketBookDetail}
            />
            <Route
              path={`/book-market/list`}
              component={LoadableMarketCreateListing}
            />
          </Switch>
        </div>
      </React.Fragment>
    )}
  />
);
