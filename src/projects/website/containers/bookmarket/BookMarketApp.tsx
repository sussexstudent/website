import React from 'react';
import { Router } from '@reach/router';
import Helmet from 'react-helmet';
import { LoadableLoading } from '~components/LoadableLoading';
import Loadable from 'react-loadable';
import { Sectionbar, SectionbarItem } from '~components/Sectionbar';
import { InternalAppLink } from '~components/InternalAppLink';
import { RouteComponent, SimpleLoadableRoute } from '~types/routes';

const LoadableMarketHome = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "MarketHome" */ './MarketHome').then(
      (m) => m.MarketHome,
    ),
}) as SimpleLoadableRoute;

const LoadableMarketMyListings = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "MarketMyListings" */ './MarketMyListings').then(
      (m) => m.MarketMyListings,
    ),
}) as any;

const LoadableMarketSearch = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "MarketSearch" */ './MarketSearch').then(
      (m) => m.MarketSearch,
    ),
}) as any;

const LoadableMarketSection = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "MarketSection" */ './MarketSection').then(
      (m) => m.MarketSection,
    ),
}) as any;

const LoadableMarketBookDetail = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "MarketBookDetail" */ './BookDetail').then(
      (m) => m.BookDetail,
    ),
}) as any; // todo: figure out how to type this

const LoadableMarketCreateListing = Loadable({
  loading: LoadableLoading,
  loader: () =>
    import(/* webpackChunkName: "MarketCreateListing" */ './CreateListing').then(
      (m) => m.CreateListing,
    ),
}) as SimpleLoadableRoute;

const BookMarketApplication: React.SFC<RouteComponent> = () => (
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
      <Router>
        <LoadableMarketHome path="/" exact />
        <LoadableMarketMyListings path="my-listings" />
        <LoadableMarketSearch path="search" />
        <LoadableMarketSection path="section/:sectionSlug" />
        <LoadableMarketBookDetail path="listing/:listingId" />
        <LoadableMarketCreateListing path="list" />
      </Router>
    </div>
  </React.Fragment>
);

export default BookMarketApplication;
