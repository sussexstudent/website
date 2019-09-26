import React from 'react';
import MobileFooterTreats from '../components/MobileFooterTreats';
import PrefooterMenu from '../components/PrefooterMenu';
import WebsiteApplication from '../pages/WebsiteApplication';
import { AppMountState } from '../ducks/router';
import { LokiHeader } from '../components/LokiHeader';
import Footer from '../components/Footer';

const Website: React.FC = () => {
  return (
    <React.Fragment>
      <LokiHeader />
      <main className="Site__content u-keep-footer-down">
        <WebsiteApplication appMountState={AppMountState.Sanguine} />
      </main>
      <MobileFooterTreats />
      <PrefooterMenu />
      <Footer />
    </React.Fragment>
  );
};

export { Website };
