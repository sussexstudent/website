import React from 'react';
import UserBar from '../components/UserBar';
import Header from '../components/Header';
import MobileFooterTreats from '../components/MobileFooterTreats';
import PrefooterMenu from '../components/PrefooterMenu';
import Footer from '../components/Footer';
import Main from '../components/Main';
import AdvertBar from '../components/AdvertBar';

const mainLayout = ({ loggedIn, assets, legacy }) => (
  <body className="Site">
    <AdvertBar position="TopBanner" />
    <UserBar loggedIn={loggedIn} />
    <Header />
    <Main legacy={legacy} />
    <MobileFooterTreats />
    <PrefooterMenu />
    <Footer />
    <AdvertBar position="lozenge1" dark />
    <div className="js__modal" />
    <script src={assets.main.js} />
  </body>
);

mainLayout.propTypes = {
  legacy: React.PropTypes.bool.isRequired,
  loggedIn: React.PropTypes.bool.isRequired,
  assets: React.PropTypes.shape({
    main: React.PropTypes.shape({
      js: React.PropTypes.string.isRequired,
    }),
  }).isRequired,
};

mainLayout.defaultProps = {
  legacy: false,
  loggedIn: false,
};

export default mainLayout;
