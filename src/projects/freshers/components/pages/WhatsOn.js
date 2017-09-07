import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { EventsContainer } from '~components/EventsCalender';
import Button from '~components/Button/index';
import LogoContentPage from '../LogoContentPage.svg';
import WhatsOnFAQ from './WhatsOnFAQ';
import getApolloClientForFalmer from '../../../../libs/getApolloClientForFalmer';

const EventsPage = () =>
  <EventsContainer filter={{ brandId: 2 }} disableHeader useAnchors />;

function FreshersWhatsOn() {
  return (
    <ApolloProvider client={getApolloClientForFalmer}>
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
        <div className="FreshersGrid--2 FreshersShell">
          <div>
            <h2>About</h2>
            <p>
              {`We've planned a week of activities and events to help you get to know
          the Students' Union, the campus, Brighton and the thousands of other
          new students.`}
            </p>
            <p>
              I{`f you have any accessibility requirements please email
          access@sussexstudent.com. If you have any questions about Freshers
          Week please email welcometeam@ussu.sussex.ac.uk`}
            </p>
            <p>
              {`As well as the events we're organising for the start of term our
          sports clubs and societies have got lots planned and we've got events
          lined up for the rest of the year.`}
            </p>
          </div>
          <div>
            <h2>Making sure everyone feels welcome & safe</h2>
            <p>
              {`It's really important to us that everyone feels welcome and safe at our events. You can be part of this by respecting other students and staff at events.`}
            </p>
            <p>
              {`Freshers' Week is a celebration, so please treat it as such. Respect other students, their bodies, and their choices. If you're initiating sexual activity with someone, make sure they are as into it as you are, and that they have the freedom and the capacity to make that decision themselves.`}
            </p>
            <p>
              {`If you are made to feel uncomfortable or violated by someone, through their words or their actions, please report the incident to a member of staff; all incidents will be dealt with very seriously.`}
            </p>
          </div>
          <div>
            <h2>Who can come to our events?</h2>
            <p>
              Though our events are primarily aimed at new students to help them
              meet people and get to know the University, returning students are
              welcome.
            </p>
            <p>
              {`Similarly, our events are for Sussex and BSMS students but if you
            have a friend who isn't a student here and would like to come along
            that is fine.`}
            </p>
            <p>
              Licensing restrictions in the UK mean that you cannot buy alcohol
              if you are under 18 and will not be allowed into many venues in
              Brighton or some of our events (including; Block Party, Sussex Tea
              Party, Pier Party, Seafront Takeover and Pryzm Psychedelic Disco)
              if you are under 18. Under 18s are not allowed in our campus bars
              after 8pm so will be unable to attend any events taking place
              after 8pm in our bars.
            </p>
            <p>
              {`Most venues (including our shops and bars) will need to see
            photographic proof of your age (i.e. your passport or photo driving
            license) if you look under 25 and would like to buy alcohol. On
            campus you can use your student card (once you've collected it) to
            prove your age.`}
            </p>
          </div>
          <div>
            <h2>Tickets</h2>
            <p>
              For some of our events you will need to purchase tickets to attend
              though we have many free events.
            </p>
            <p>
              <Button href="https://www.native.fm/all-events?category=8">
                Buy tickets on Native
              </Button>
            </p>
            <p>
              {`Once tickets sell out we can't release any more as we only have
            limited space at our events. If there are tickets left we will sell
            them on campus from 16 September. We recommend you buy your tickets
            in advance as many of our events will sell out.`}
            </p>
          </div>
          <div>
            <em>All times are displayed locally.</em>
          </div>
        </div>
        <div className="FreshersGrid--1">
          <Switch>
            <Route path="/whats-on/about/" exact component={WhatsOnFAQ} />
            <Route path="" exact component={EventsPage} />
          </Switch>
        </div>
      </div>
    </ApolloProvider>
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
