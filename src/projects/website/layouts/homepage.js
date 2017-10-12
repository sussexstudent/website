import React from 'react';
import TweetList from '~components/TweetList';
import ContentAPIComposer from '~components/ContentAPIComposer';
import HomepageEventsList from '~components/HomepageEventsList';
import AdvertBar from '~components/AdvertBar';
import Grill from '../../../components/Grill';

const Homepage = () => (
  <div className="u-container-bleed-top">
    <AdvertBar className="AdvertBar--mobile-home" position="TopBanner" />
    <div className="Trail">
      <div className="Trail__row  u-container-bleed-2">
        <Grill />
      </div>
      <div className="Trail__row Trail__row--211">
        <div className="ContentBlock">
          <div className="ContentBlock__heading">News</div>
          <div className="u-h">{'{unionnewslist}'}</div>
          <div className="app__news" />
          <a className="NewsViewMore" href="/news">
            Read more news stories
          </a>
        </div>
        <div className="ContentBlock">
          <div className="ContentBlock__heading">{"What's on"}</div>
          <HomepageEventsList />
        </div>
        <div className="ContentBlock">
          <div className="ContentBlock__heading">Twitter</div>
          <TweetList
            query="list/ussu,ussu"
            signature="f1b9176fddbe7114295eb4bfc65070c5a130a94d"
          />
        </div>
      </div>

      <ContentAPIComposer pageId={12} />
    </div>
  </div>
);

export default Homepage;
