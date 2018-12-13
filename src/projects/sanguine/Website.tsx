import React from 'react';
import MobileFooterTreats from '~components/MobileFooterTreats';
import Footer from '~components/Footer';
import { LokiHeaderServer } from '~components/LokiHeader';
import PrefooterMenu from '~components/PrefooterMenu';
import WebsiteApplication from '~website/containers/WebsiteApplication';
import { AppMountState } from '~website/ducks/router';
import { cx } from 'emotion';

interface IProps {
  loggedIn: boolean;
  assets: {
    map: {
      main: {
        js: string;
      };
      vendor: {
        js: string;
      };
    };
  };
}

const Website: React.SFC<IProps> = () => {
  return (
    <React.Fragment>
      {/*<AdvertBar className="AdvertBar--top" position="TopBanner" />*/}
      <LokiHeaderServer />
      <main className={cx('Site__content u-keep-footer-down')}>
        <WebsiteApplication appMountState={AppMountState.Sanguine} />
      </main>
      <MobileFooterTreats />
      <PrefooterMenu />
      <Footer />
      <div className="AdvertBar AdvertBar--donatello">
        <a
          className="AdvertBar__advert"
          href="http://www.donatello.co.uk/?utm_source=ussu&utm_medium=footer"
        >
          {/*<DonatelloBanner />*/}
        </a>
      </div>
    </React.Fragment>
  );
};

Website.defaultProps = {
  loggedIn: false,
};

export { Website };
