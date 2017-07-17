import React from 'react';
import TweetList from '@ussu/components/TweetList';
import ContentAPIComposer from '@ussu/components/ContentAPIComposer';
import HomepageEventsList from '../components/HomepageEventsList';
import { Hydro as HeadingHero } from '../../src/js/components/HeadingHero/index';
import AdvertBar from '../components/AdvertBar';

const Homepage = () =>
  <div className="u-container-bleed-top">
    <AdvertBar className="AdvertBar--mobile-home" position="TopBanner" />
    <div className="Trail">
      <div className="Trail__row  u-container-bleed-2">
        <a
          className="HeadingImage--link"
          href="https://www.sussexstudent.com/our-campus-services/"
        >
          <HeadingHero
            imageURL="/images/ec00cc188009492f868d14ac9a228b97.original.jpg"
            title={'Last chance: The Horrors tickets on sale now'}
          />
        </a>
      </div>
      <div className="Trail__row Trail__row--211">
        <div className="ContentBlock">
          <div className="ContentBlock__heading">News</div>
          <div className="u-h">
            {'{unionnewslist}'}
          </div>
          <div className="app__news" />
          <a className="NewsViewMore" href="/news">
            Read more news stories
          </a>
        </div>
        <div className="ContentBlock">
          <div className="ContentBlock__heading">
            {"What's on"}
          </div>
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
  </div>;

export default Homepage;
