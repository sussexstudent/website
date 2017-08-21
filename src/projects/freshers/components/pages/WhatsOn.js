import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { EventsContainer } from '../../../../components/EventsCalender';
import LogoContentPage from '../LogoContentPage.svg';
import WhatsOnFAQ from './WhatsOnFAQ';

const EventsPage = () =>
  <EventsContainer limitToFreshers disableHeader useAnchors />;

function FreshersWhatsOn() {
  return (
    <div>
      <Link to="/">
        <img
          className="FreshersLogoHeader"
          src={LogoContentPage}
          alt="Freshers Week 2017"
        />
      </Link>
      <h1 className="FreshersHeading">
        {`What's on`}
      </h1>
      <div className="FreshersGrid--1">
        <Switch>
          <Route path="/whats-on/about/" exact component={WhatsOnFAQ} />
          <Route path="" exact component={EventsPage} />
        </Switch>
      </div>
    </div>
  );
}

/*
* {' '}
        <Link
          to="/whats-on/about/"
          style={{ fontSize: '0.9rem', color: '#ffffff' }}
        >
          About our events
        </Link>
* */

FreshersWhatsOn.propTypes = {};

export default FreshersWhatsOn;
