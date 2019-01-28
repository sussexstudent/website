import React from 'react';
import MobileFooterTreats from '~components/MobileFooterTreats';
// import PrefooterMenu from '~components/PrefooterMenu';
import Footer from '~components/Footer';
import Main from '~components/Main';
import AdvertBar from '~components/AdvertBar';
import MSLTag from '~components/MSLTag';
import { LokiHeader } from '~components/LokiHeader';
import {MSLAdvert} from "~components/AdvertBar/MSLAdvert";

const ga = `!function(u,s,S,U){u.GoogleAnalyticsObject=S;u[S]||(u[S]=function(){
(u[S].q=u[S].q||[]).push(arguments)});u[S].l=+new Date;U=s.createElement('script');
var e=s.scripts[0];U.src='//www.google-analytics.com/analytics.js';
e.parentNode.insertBefore(U,e)}(window,document,'ga');

ga('create', 'UA-258929-3', 'auto');
ga('send', 'pageview');`;

const mslLogout = MSLTag('LoginButton', {
  LoginText: 'Log in',
  LogoutText: 'Log out',
  GoHomeOnLogout: 'True',
});

interface IProps {
  legacy: boolean;
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

const mainLayout: React.FC<IProps> = ({ assets, legacy }) => {
  return (
    <div className="Body" id="top">
      <div
        style={{ display: 'none' }}
        dangerouslySetInnerHTML={{
          __html: `${MSLTag('ControlPanel')}${MSLTag('Admin')}${mslLogout}`,
        }}
      />
      <div className="Site">
        <AdvertBar className="AdvertBar--top">
          <MSLAdvert position="TopBanner" />
          <a
            className="AdvertBar__advert"
            href="https://zugarznap.com/insurance/gadget-ga-sussex/get-cover?utm_source=sussexuniversity&utm_medium=cpc&utm_campaign=gadgetsussex"
          >
            <img src="https://su.imgix.net/original_images/77f38e7e1f094974b0a9c3f9e6e8ed8c?w=960&h=138&auto=format&q=60" alt="ZugarZnap Insurance (ad)" />
          </a>
        </AdvertBar>
        <LokiHeader />
        <Main legacy={legacy} />
        <MobileFooterTreats />
        {/* <PrefooterMenu /> */}
        <Footer />
      </div>
      <div className="js__modal" />
      <div className="js-side-menu" />
      <script src="https://cdn.polyfill.io/v2/polyfill.min.js?rum=0&features=es6,es7,default-3.6,performance.now,Object.entries,Object.values&flags=gated&callback=hasPolyfilled&unknown=polyfill" />
      <script src={assets.map.vendor && assets.map.vendor.js} />
      <script src={assets.map.main && assets.map.main.js} />
      <script dangerouslySetInnerHTML={{ __html: ga }} />
      <noscript>
        <img
          alt=""
          src="https://secure.leadforensics.com/110817.png"
          style={{ display: 'none' }}
        />
      </noscript>
    </div>
  );
};

mainLayout.defaultProps = {
  legacy: false,
  loggedIn: false,
};

export default mainLayout;
