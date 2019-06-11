import React from 'react';
import MobileFooterTreats from '@ussu/website/src/components/MobileFooterTreats';
import Footer from '@ussu/website/src/componets/Footer';
import PrefooterMenu from '@ussu/website/src/components/PrefooterMenu';
import WebsiteApplication from '@ussu/website/src/containers/WebsiteApplication';
import { AppMountState } from '@ussu/website/src/ducks/router';
import { LokiHeader } from '@ussu/website/src/componets/LokiHeader';

interface IProps {}

const Website: React.FC<IProps> = () => {
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
