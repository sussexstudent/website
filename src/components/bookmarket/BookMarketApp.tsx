import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {MarketHome} from "~components/BookMarket/MarketHome";
import HydroLeaf from "~components/HydroLeaf";

const BookMarketApplication: React.SFC<{}> = () => (
  <Route path={`/book-market/`} component={() => (
    <Switch>
      <Route path={`/book-market/`} component={MarketHome} exact />
      <Route path={`/book-market/my-books`} component={MarketHome} />
      <Route path={`/book-market/search`} component={MarketHome} />
      <Route path={`/book-market/book/:id`} component={MarketHome} />
      <Route path={`/book-market/list`} component={MarketHome} />
    </Switch>
  )} />
);


export default HydroLeaf({ disableSSR: true, name: 'BookMarket' })(BookMarketApplication);
