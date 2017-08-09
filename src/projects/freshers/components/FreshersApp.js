import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import SocialMenu from '~components/SocialMenu';
import Background from './Background';
import FreshersHeader from './FreshersHeader';
import FreshersFooter from './FreshersFooter';

import FreshersHomepage from './pages/HomePage';
import FreshersWhatsOn from './pages/WhatsOn';
import FreshersGuides from './pages/Guides';
import FreshersGuidesTopTips from './pages/GuidesTopTips';
import ScrollToTop from './ScrollToTop';

const history = createBrowserHistory({
  basename: '/freshers/',
});

const FreshersApp = () =>
  <Router history={history}>
    <ScrollToTop>
      <div className="FreshersAppContent">
        <FreshersHeader />
        <div className="Container">
          <Switch>
            <Route path="/" exact component={FreshersHomepage} />
            <Route path="/whats-on" exact component={FreshersWhatsOn} />
            <Route path="/guides" exact component={FreshersGuides} />
            <Route
              path="/guides/10-top-tips"
              exact
              component={FreshersGuidesTopTips}
            />
            <Redirect
              from="/events"
              to="/whats-on"
              exact
              component={FreshersWhatsOn}
            />
          </Switch>
          <div className="FreshersSocial">
            <h2>Join the conversation</h2>
            <SocialMenu />
          </div>
        </div>
        <FreshersFooter />
        <Background />
      </div>
    </ScrollToTop>
  </Router>;

export default FreshersApp;
