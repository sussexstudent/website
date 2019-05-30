import React from 'react';
import MobileFooterTreats from '~components/MobileFooterTreats';
import Footer from '~components/Footer';
import PrefooterMenu from '~components/PrefooterMenu';
import WebsiteApplication from '~website/containers/WebsiteApplication';
import { AppMountState } from '~website/ducks/router';
import { cx } from 'emotion';
import { LokiHeaderServer } from '~components/LokiHeader';

interface IProps {}

const Website: React.FC<IProps> = () => {
  return (
    <React.Fragment>
      <LokiHeaderServer />
      <main className={cx('Site__content u-keep-footer-down')}>
        <WebsiteApplication appMountState={AppMountState.Sanguine} />
      </main>
      <MobileFooterTreats />
      <PrefooterMenu />
      <Footer />
    </React.Fragment>
  );
};

export { Website };
