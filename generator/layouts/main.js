import React from 'react';
import PropTypes from 'prop-types';
import Header from '@ussu/components/Header';
import UserBar from '@ussu/components/UserBar';
import MobileFooterTreats from '../components/MobileFooterTreats';
// import PrefooterMenu from '../components/PrefooterMenu';
import Footer from '../components/Footer';
import Main from '../components/Main';
import AdvertBar from '../components/AdvertBar';
import MSLTag from '../components/MSLTag';

const ga = `!function(u,s,S,U){u.GoogleAnalyticsObject=S;u[S]||(u[S]=function(){
(u[S].q=u[S].q||[]).push(arguments)});u[S].l=+new Date;U=s.createElement('script');
var e=s.scripts[0];U.src='//www.google-analytics.com/analytics.js';
e.parentNode.insertBefore(U,e)}(window,document,'ga');

ga('create', 'UA-258929-3', 'auto');
ga('send', 'pageview');`;

const authStyles = loggedIn => `
.u-${loggedIn ? 'anon' : 'auth'}-hide {display: none}
`;

const mslLogout = MSLTag('LoginButton', {
  LoginText: 'Log in',
  LogoutText: 'Log out',
  GoHomeOnLogout: 'True',
});

const mainLayout = ({ loggedIn, assets, legacy }) =>
  <body className="Body" id="top">
    <style>
      {authStyles(loggedIn)}
    </style>
    <div
      style={{ display: 'none' }}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `${MSLTag('ControlPanel')}${MSLTag('Admin')}${mslLogout}`,
      }}
    />
    <div className="Site">
      <AdvertBar className="AdvertBar--top" position="TopBanner" />
      <UserBar />
      <Header />
      <Main legacy={legacy} />
      <MobileFooterTreats />
      {/* <PrefooterMenu /> */}
      <Footer />
      <AdvertBar position="lozenge1" dark />
    </div>
    <div className="js__modal" />
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?rum=0&features=es6,es7,default-3.6,performance.now,Object.entries&flags=gated&callback=hasPolyfilled&unknown=polyfill" />
    <script src={assets.vendor.js} />
    <script src={assets.main.js} />
    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: ga }} />
  </body>;

mainLayout.propTypes = {
  legacy: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  assets: PropTypes.shape({
    main: PropTypes.shape({
      js: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

mainLayout.defaultProps = {
  legacy: false,
  loggedIn: false,
};

export default mainLayout;
