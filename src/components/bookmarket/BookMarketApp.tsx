import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MarketHome } from '~components/BookMarket/MarketHome';
import HydroLeaf from '~components/HydroLeaf';
import { Provider } from '../../types/hydro';
import { BookDetail } from '~components/bookmarket/BookDetail';
import { CreateListing } from '~components/bookmarket/CreateListing';
import { MarketSearch } from '~components/bookmarket/MarketSearch';
import { MarketSection } from '~components/bookmarket/MarketSection';
import { MarketMyListings } from '~components/bookmarket/MarketMyListings';

const BookMarketApplication: React.SFC<{}> = () => (
  <Route
    path={`/book-market/`}
    component={() => (
      <Switch>
        <Route path={`/book-market/`} component={MarketHome} exact />
        <Route path={`/book-market/my-listings`} component={MarketMyListings} />
        <Route path={`/book-market/search`} component={MarketSearch} />
        <Route
          path={`/book-market/section/:sectionSlug`}
          component={MarketSection}
        />
        <Route
          path={`/book-market/listing/:listingId`}
          component={BookDetail}
        />
        <Route path={`/book-market/list`} component={CreateListing} />
      </Switch>
    )}
  />
);

export default HydroLeaf({
  disableSSR: true,
  name: 'BookMarket',
  providers: [Provider.Apollo, Provider.Router],
})(BookMarketApplication);
