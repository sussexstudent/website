import React, { useState } from 'react';
import { NewsletterSignup } from '../../../components/NewsletterSignup';
import {
  AspectRatio,
  OneImage,
  OneImageBackground,
} from '../../../components/OneImage';
import { Link } from 'react-router-dom';

const FreshersHomepage: React.FC = () => {
  const [showVideo, setShowVideo] = useState(true);
  return (
    <React.Fragment>
      <div className="FreshersHomepage">
        <OneImageBackground
          className="SplashSlice"
          src="original_images/aef7c351fec64f5eb14ba9e8823e7940"
          aspectRatio={AspectRatio.r16by9}
        >
          <div className="FreshersLogoContainer">
            <div className="u-responsive-ratio u-responsive-ratio--r23by8" />
          </div>
          <NewsletterSignup />
        </OneImageBackground>
        <div className="FreshersHomepage__slice FreshersHomepage__slice--events">
          <div className="LokiContainer">
            <h2>
              With over 100 events,
              <br />
              Freshers Week is for everyone
            </h2>
            <p>
              The Students’ Union put on over 100 events for you in Freshers
              Week alone. We’ve worked hard to make sure there’s something for
              everyone.
            </p>

            <p>
              Whether you’re into club nights, bar crawls, puzzles or
              performances. We’ve got something for you! We have alcohol-free
              events, events great for post-graduates, and family events.
            </p>
            <Link to="/freshers/whats-on">See the schedule ></Link>
          </div>
        </div>
        {showVideo ? (
          <div className="u-responsive-ratio u-responsive-ratio--r16by9">
            <iframe
              className="u-responsive-inner"
              src="https://www.youtube-nocookie.com/embed/R1KRavrc3wM?rel=0&amp;controls=0&amp;showinfo=0"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : (
          <OneImageBackground
            className="FreshersHomepage__slice FreshersHomepage__slice--preview"
            src="original_images/5447829aff30461d8a26414b9959212e"
            aspectRatio={AspectRatio.r16by9}
          >
            <button onClick={() => setShowVideo(true)}>
              <h1>Sneak Peek</h1>
            </button>
          </OneImageBackground>
        )}
        <div className="FreshersHomepage__slice FreshersHomepage__slice--gt FGT">
          <div className="LokiContainer">
            <div className="FGT__header">
              <div>
                <h2 className="FGT__heading">
                  Save on the biggest events
                  <br />
                  with the Freshers Golden Ticket
                </h2>
                <p>
                  The Golden Ticket gives you access to the week’s biggest and
                  best events. Saves you money, time and gets you priority
                  entry.
                </p>
                <p>
                  Make sure to sign up to be notified when these go on early
                  bird sale, The Golden Ticket is very popular and when they’re
                  gone, they’re gone!
                </p>
              </div>

              <div className="FGT__ticket">
                <OneImage
                  src="original_images/9c7c9013560746d9b1f3e6135f67523b"
                  aspectRatio={{ width: 1920, height: 1118 }}
                  alt="Golden Ticket"
                />
              </div>
            </div>
            <div className="FGT__countdown">
              {/*<Countdown targetDate={new Date(2018, 7, 17, 12, 0, 0)} />*/}
            </div>

            <h3 className="tac">
              Limited Golden Tickets Available,
              <br />
              Guaranteed to Sell Out!
            </h3>
          </div>
        </div>
        <div className="FreshersHomepage__slice FreshersHomepage__slice--union FUnion">
          <div className="LokiContainer">
            <h2>We're your Students' Union</h2>
            <div>
              <h3>
                You'll automatically become a member of the Students' Union
              </h3>
              <p>
                We are a community of over 18,000 students and you're a member
                of that community when you study at Sussex or BSMS.
              </p>
              <p>
                Independent from the University, we are undergraduates,
                postgraduates, mature students, parents, international students,
                elected Students' Union officers, volunteers and staff. We're
                sports team members, Student Reps, campaigners, society
                committee members, event attendees, shoppers and bargain
                hunters. We're all of our 18,000 members.{' '}
              </p>
            </div>

            <div className="FUnion__areas">
              <div>
                <h3>Societies {'&'} sports</h3>
                <p>
                  We have over 200 societies and sports clubs, and you can join
                  as many as you like from the first week. We help run a whole
                  range of groups including sports, performing arts, political,
                  music,crafts. LGBTQ+ and religious societies, so there’s bound
                  to be something for you. If nothing we have takes your fancy,
                  we can help you start your very own society.
                </p>
                <a href="https://www.sussexstudent.com/sport-societies-media/discover/">
                  Discover student groups
                </a>
              </div>
              <div>
                <h3>Jobs</h3>
                <p>
                  We have many jobs on offer for new and returning students. We
                  employ students in our outlets and beyond to help make our
                  Students’ Union the best it can be.
                </p>
                <a href="http://sussexstudent.us11.list-manage.com/subscribe?u=23e3c41370592d03091dbc21a&id=32f92b5623">
                  Join the vacancy mailing list
                </a>
              </div>
              <div>
                <h3>Campus Services</h3>
                <p>
                  We run all the shops and bars on campus with students in mind.
                  We’re for students, not for profit, so there are always great
                  deals.
                </p>
                <p>
                  We also run support services, so if you’re struggling to cope
                  with anything, we’re here to help.
                </p>
                <a href="https://www.sussexstudent.com/our-campus-services/">
                  View our shops {'&'} bars
                </a>
              </div>
            </div>
          </div>
        </div>
        <OneImage
          src="original_images/6eef061339984624a105c4f01f8a146a"
          aspectRatio={AspectRatio.r16by9}
          alt="Brighton Pier"
        />
        <div>
          <div className="LokiContainer tac FreshersHomepage__attend">
            <h2>
              Attend on{' '}
              <a href="https://www.facebook.com/events/989785784517866/">
                Facebook
              </a>
            </h2>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FreshersHomepage;
