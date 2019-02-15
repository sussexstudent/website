import React from 'react';
// import TweetList from '~components/TweetList';
// import HomepageEventsList from '~components/HomepageEventsList';
import { ContentPage } from '~website/containers/content/ContentPage';
import { Bento } from '~components/Bento';
import { HomepageSplash } from '~website/components/HomepageSplash';
import { UserWelcome } from '~website/components/UserWelcome';
import { RouteComponent } from '~types/routes';
import { ScrollToTop } from '~components/ScrollToTop';
import { AboutTheUnion } from '~website/components/AboutTheUnion';
import AdvertBar from '~components/AdvertBar';
import { MSLAdvert } from '~components/AdvertBar/MSLAdvert';
import NewsList from '~components/NewsList';
// @ts-ignore
import { parseNews } from 'msl-utils';

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
          <a
            className="AdvertBar__advert"
            href="https://zugarznap.com/insurance/gadget-ga-sussex/get-cover?utm_source=sussexuniversity&utm_medium=cpc&utm_campaign=gadgetsussex"
          >
            <img
              src="https://su.imgix.net/original_images/77f38e7e1f094974b0a9c3f9e6e8ed8c?w=960&h=138&auto=format&q=60"
              alt="ZugarZnap Insurance (ad)"
            />
          </a>
        </AdvertBar>
        <HomepageSplash />
        <div className="LokiContainer">
          <UserWelcome />
          <Bento />
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
        <AboutTheUnion />
        <div className="LokiContainer">
          <ContentPage path={'/homepage'} />
        </div>
      </div>
    </ScrollToTop>
  );
};

export default Homepage;
