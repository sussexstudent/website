import React from 'react';
// import TweetList from '~components/TweetList';
// import HomepageEventsList from '~components/HomepageEventsList';
import { ContentPage } from '~website/containers/content/ContentPage';
import { Bento } from '~components/Bento';
import { HomepageSplash } from '~website/components/HomepageSplash';
import { UserWelcome } from '~website/components/UserWelcome';
import { RouteComponent } from '~types/routes';
import { ScrollToTop } from '~components/ScrollToTop';
import {AboutTheUnion} from "~website/components/AboutTheUnion";

const Homepage: React.SFC<RouteComponent> = () => (
  <ScrollToTop>
    <HomepageSplash />
    <div className="LokiContainer">
      <UserWelcome />
      <Bento />
      {/*<div className="Trail">*/}
        {/*<div className="Trail__row Trail__row--211">*/}
          {/*<div className="ContentBlock">*/}
            {/*<div className="ContentBlock__heading">News</div>*/}
            {/*<div className="u-h">{'{unionnewslist}'}</div>*/}
            {/*<div className="app__news" />*/}
            {/*<a className="NewsViewMore type-brevier" href="/news">*/}
              {/*Read more news stories*/}
            {/*</a>*/}
          {/*</div>*/}
          {/*<div className="ContentBlock">*/}
            {/*<div className="ContentBlock__heading">{"What's on"}</div>*/}
            {/*<HomepageEventsList />*/}
          {/*</div>*/}
          {/*<div className="ContentBlock">*/}
            {/*<div className="ContentBlock__heading">Twitter</div>*/}
            {/*<TweetList*/}
              {/*query="list/ussu,ussu"*/}
              {/*signature="f1b9176fddbe7114295eb4bfc65070c5a130a94d"*/}
            {/*/>*/}
          {/*</div>*/}
        {/*</div>*/}
      {/*</div>*/}
    </div>
    <AboutTheUnion />
    <div className="LokiContainer">
      <ContentPage path={'/homepage'} />
    </div>
  </ScrollToTop>
);

export default Homepage;
