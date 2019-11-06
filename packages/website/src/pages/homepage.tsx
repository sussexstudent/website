import React, { useCallback } from 'react';
import { ContentPage } from '../pages/content/ContentPage';
import { HomepageSplash } from '../components/HomepageSplash';
import { RouteComponent } from '@ussu/common/src/types/routes';
import { ScrollToTop } from '../components/ScrollToTop';
import { AboutTheUnion } from '../components/AboutTheUnion';
import { AdvertBar } from '../components/AdvertBar';
import { MSLAdvert } from '../components/AdvertBar/MSLAdvert';
import { NewsList } from '../components/NewsList';
import { SlateContainer } from '../components/Slate/SlateContainer';
import { parseNews } from '@ussu/common/src/libs/msl';
import { css } from '@emotion/core';
import { useMappedState } from 'redux-react-hook';
import { WebsiteRootState } from '../types/website';

const Homepage: React.FC<RouteComponent> = () => {
  const mapState = useCallback(
    (state: WebsiteRootState) => ({
      user: state.user,
    }),
    [],
  );
  const { user } = useMappedState(mapState);

  let articles =
    typeof window === 'undefined' ? [] : parseNews(window.document.body);
  if (articles.length > 4) {
    articles = articles.slice(0, 4);
  }

  const NewsWrapper = css({
    backgroundColor: '#E6E8E7',
    padding: '1rem 0 2.1rem',
  });

  const Scrollable = css({
    width: '100%',
    overflowX: 'scroll',
  });

  return (
    <ScrollToTop>
      <div className="u-header-bleed">
        <AdvertBar className="AdvertBar--mobile-home">
          <MSLAdvert position="TopBanner" />
        </AdvertBar>
        <HomepageSplash />
        {user.isLoggedIn ? (
          <div className="LokiContainer">
            <div className="HomepageSplashLower">
              <SlateContainer />
            </div>
          </div>
        ) : null}
        <div css={NewsWrapper}>
          <div className="LokiContainer">
            <h2 className="type-double-pica ContentBlock__heading">
              <a css={{ color: 'black', textDecoration: 'none' }} href="/news">
                Latest news &raquo;
              </a>
            </h2>
            <div className="Homepage" css={Scrollable}>
              <NewsList items={articles} fullWidth />
            </div>
          </div>
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
