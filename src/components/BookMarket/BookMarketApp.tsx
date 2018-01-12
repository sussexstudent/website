import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {MarketHome} from "~components/BookMarket/MarketHome";

const BookMarketApplication: React.SFC<{}> = () => (
  <Route path={`/book-market/`} component={() => (
    <Switch>
      <Route path={`/`} component={MarketHome} exact />
    </Switch>
  )} />
);


export { BookMarketApplication };
