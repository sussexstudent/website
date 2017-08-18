import React from 'react';
import { Link } from 'react-router-dom';
import LogoContentPage from '../LogoContentPage.svg';

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
      <h1 className="FreshersHeading">{`What's on`}</h1>
      <div className="FreshersGrid--1">
        <div className="FreshersBox">
          <h2>ABOUT FRESHERS’ WEEK EVENTS</h2>
          <p
          >{`We’ve got a whole week of fun festivities, activities and events to help you get to know the Student’s Union, campus, Brighton and the thousands of other students also starting at Sussex with you!`}</p>
          <p
          >{`Events will be announced on August 17th, so keep your eyes peeled! To find out about Freshers Week before anyone else, sign up to our newsletter!`}</p>

          <p
          >{`The fun doesn’t end with Freshers’ Week, however, with our sports teams and societies planning lots of great events for the rest of the year!`}</p>

          <p
          >{`The Students’ Union aims to make all of its events as accessible to everyone as possible. If you have any accessibility requirements, please email access@sussexstudent.com.`}</p>

          <p
          >{`If you have any questions about Freshers’ Week, email our Welcome Team - welcometeam@ussu.sussex.ac.uk.`}</p>
        </div>
        <div className="FreshersBox">
          <h2>MAKING EVERYONE FEEL WELCOME AND SAFE</h2>
          <p
          >{`It is really important to us that everyone who attends our events feel welcome and safe at all times. You can be a part of this by respecting other students and staff at events.`}</p>

          <p
          >{`Respect other students, their bodies and their choices. If you are initiating sexual activity with someone, make sure they are into it as you are and that they have the freedom and capacity to make that decision themselves. For more information on this, visit our I Heart Consent campaign.`}</p>

          <p
          >{`If someone makes you feel uncomfortable, through their words or their actions, please report the incident to a member of staff. All incidents reported to us are dealt with very seriously.`}</p>
        </div>
        <div className="FreshersBox">
          <h2>WHO CAN COME TO OUR EVENTS?</h2>
          <p
          >{`Although our events during Freshers’ Week are primarily aimed at new students to help them meet new people and get to know the University and the Union, returning students are also welcome.`}</p>

          <p
          >{`Similarly, our events are for students studying at Sussex University, BSMS or IDS, but if you have a friend who isn’t a student here and would like to come along, they are also welcome.`}</p>

          <p
          >{`UK licensing restrictions mean that under 18s can not buy alcohol and will not be allowed into some of our events or many venues in Brighton. Under 18s are also not allowed in our bars on campus after 8pm, and so will be unable to attend events taking place in our bars after that time.`}</p>

          <p
          >{`Most venues and stores (including our shops and bars) will need to see photographic proof of your age (such as a passport or a photo driving license) if you look under 25 and want to buy alcohol. If you are on campus, you can use your student card (after you’ve collected it) to prove your age.`}</p>
        </div>{' '}
        <div className="FreshersBox">
          <h2>TICKETS</h2>
          <p
          >{`Be the first in line for our biggest Freshers Week events for a Golden Ticket! Save some money and skip the queues with faster entry to five of our biggest events.`}</p>

          <p
          >{`Wristbands are very limited, so make sure to get yours before they’re gone!`}</p>

          <p
          >{`Remember, this is the only wristband that will guarantee entry to your official Students’ Union Freshers Week events. Accept no imitations!`}</p>

          <p
          >{`Although a lot of our events are free to attend, for some events you will need to purchase tickets.`}</p>

          <p
          >{`Events and tickets will be announced on A level results day (August 17th).`}</p>

          <p
          >{`Once tickets have sold out, we can’t release any more as we have limited space at our events. Buy your tickets as soon as possible to avoid disappointment - as they will sell out!`}</p>
        </div>
      </div>
    </div>
  );
}

FreshersWhatsOn.propTypes = {};

export default FreshersWhatsOn;
