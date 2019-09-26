import React from 'react';
import { ContentPage } from '../pages/content/ContentPage';
import { HomepageSplash } from '../components/HomepageSplash';
import { RouteComponent } from '@ussu/common/src/types/routes';
import { ScrollToTop } from '../components/ScrollToTop';
import { AboutTheUnion } from '../components/AboutTheUnion';
import AdvertBar from '../components/AdvertBar';
import { MSLAdvert } from '../components/AdvertBar/MSLAdvert';
import NewsList from '../components/NewsList';
import { SlateContainer } from '../components/Slate/SlateContainer';
import { parseNews } from '@ussu/common/src/libs/msl';

const Homepage: React.FC<RouteComponent> = () => {
  let articles =
    typeof window === 'undefined' ? [] : parseNews(window.document.body);
  if (articles.length > 4) {
    articles = articles.slice(0, 4);
  }

  return (
    <ScrollToTop>
      <div className="u-header-bleed">
        <AdvertBar className="AdvertBar--mobile-home">
          <MSLAdvert position="TopBanner" />
        </AdvertBar>
        <HomepageSplash />
        <div className="LokiContainer">
          <div className="HomepageSplashLower">
            <SlateContainer />
          </div>
          <div>
            <h2 className="type-double-pica">Latest news</h2>
            <NewsList items={articles} fullWidth />
          </div>
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
        <div className="LokiContainer">
          <ContentPage path={'/homepage'} />
        </div>
        <AboutTheUnion />
      </div>
    </ScrollToTop>
  );
};

export default Homepage;
