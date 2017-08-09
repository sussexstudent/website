import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterSignup from '../NewsletterSignup';
import FreshersLogo from '../FreshersLogo.svg';

function FreshersHomepage() {
  return (
    <div>
      <img
        className="FreshersLogoHeader"
        src={FreshersLogo}
        alt="Freshers Week 2017"
      />
      <div style={{ marginBottom: '8rem' }}>
        <NewsletterSignup />
      </div>

      <ul className="FreshersGrid">
        <li className="FreshersBox">
          <h2>Events & tickets</h2>
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
          <Link to="/whats-on">See our events</Link>
        </li>
        <li className="FreshersBox">
          <h2>Chat to other new students on Facebook</h2>
          <p>
            We run the only official Facebook group for new Sussex & BSMS
            students
          </p>
          <a href="https://www.facebook.com/groups/1373149279434743/">
            Join the Facebook group
          </a>
        </li>
        <li className="FreshersBox">
          <h2>
            {"What does the Students' Union do?"}
          </h2>
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
        <li className="FreshersBox">
          <h2>Work for us</h2>
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

FreshersHomepage.propTypes = {};

export default FreshersHomepage;
