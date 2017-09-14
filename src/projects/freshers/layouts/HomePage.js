import React from 'react';
import { Hydro as NewsletterSignup } from '../components/NewsletterSignup';
import FreshersLogo from '../components/FreshersLogo.svg.react';

function FreshersPage() {
  return (
    <div>
      <img
        className="FreshersLogoHeader"
        src={FreshersLogo}
        alt="Freshers Week 2017"
      />
      <NewsletterSignup />

      <ul className="FreshersGrid">
        <li>
          <h1>Events & tickets</h1>
          <p>
            {
              "We've put together a packed week of events for you to choose from to get to know Sussex, Brighton and the Students' Union."
            }
          </p>
          <p>
            {
              'Lots of our events are free but you need to buy tickets for some of them.'
            }
          </p>
          <a href="/freshers/whats-on">See our events</a>
        </li>
        <li>
          <h1>Chat to other new students on Facebook</h1>
          <p>
            We run the only official Facebook group for new Sussex & BSMS
            students
          </p>
          <a href="https://www.facebook.com/groups/1628567234059659/">
            Join the Facebook group
          </a>
        </li>
        <li>
          <h1>{"What does the Students' Union do?"}</h1>
          <p>
            {
              "The Students' Union is run for and by students, and provides students with an opportunity to get involved in a variety of activities."
            }
          </p>
          <p>
            {
              "When you enrol with the University you'll automatically become a member of the Students' Union and be part of our independent, student-led organisation. That means you can make it what you want it to be and be part of our collective voice."
            }
          </p>
          <a href="https://www.sussexstudent.com/about-us/">Find out more</a>
        </li>
        <li>
          <h1>Work for us</h1>
          <p>
            {`Applications to work in the Students' Union's shops and bars will be
            opening very soon. Sign up for our vacancy notification service for
            updates on vacancies!`}
          </p>
          <a href="http://sussexstudent.com/about-us/jobs/">
            Find out about our vacancies
          </a>
        </li>
      </ul>
    </div>
  );
}

FreshersPage.template = 'freshersMSL';

export default FreshersPage;
