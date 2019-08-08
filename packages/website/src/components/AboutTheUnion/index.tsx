import React from 'react';

export const AboutTheUnion = () => (
  <div className="FreshersHomepage__slice FreshersHomepage__slice--union FUnion">
    <div className="LokiContainer">
      <h2>We're your Students' Union</h2>
      <div>
        <h3>You'll automatically become a member of the Students' Union</h3>
        <p>
          We are a community of over 18,000 students and you're a member of that
          community when you study at Sussex or BSMS.
        </p>
        <p>
          Independent from the University, we are undergraduates, postgraduates,
          mature students, parents, international students, elected Students'
          Union officers, volunteers and staff. We're sports team members,
          Student Reps, campaigners, society committee members, event attendees,
          shoppers and bargain hunters. We're all of our 18,000 members.{' '}
        </p>
      </div>

      <div className="FUnion__areas">
        <div>
          <h3>Societies {'&'} sports</h3>
          <p>
            We have over 250 societies and sports clubs, and you can join as
            many as you like from the first week.
          </p>
          <a href="https://www.sussexstudent.com/sport-societies-media/discover/">
            Discover student groups
          </a>
        </div>
        <div>
          <h3>Jobs</h3>
          <p>
            We employ students in our outlets and beyond to help make our
            Students’ Union the best it can be.
          </p>
          <a href="http://sussexstudent.us11.list-manage.com/subscribe?u=23e3c41370592d03091dbc21a&id=32f92b5623">
            Join the vacancy mailing list
          </a>
        </div>
        <div>
          <h3>Outlets</h3>
          <p>
            We run shops and bars on campus with students in mind. We’re for
            students, not for profit, so there are always great deals.
          </p>
          <a href="/services/outlets/">View our shops {'&'} bars</a>
        </div>
      </div>
    </div>
  </div>
);
