import React from 'react';
import { NewsletterSignup } from '~components/NewsletterSignup';
import { Lottie } from '~components/Lottie';
import logoAnimation from '../../freshers/logoAnimation.json';
import {OneImage, OneImageBackground, AspectRatio} from "~components/OneImage";

function FreshersHomepage() {
  return (
    <React.Fragment>
        <div className="FreshersHomepage">
        <OneImageBackground src="original_images/aef7c351fec64f5eb14ba9e8823e7940" aspectRatio={AspectRatio.r16by9}>
          <div className="FreshersLogoContainer">
            <div className="u-responsive-ratio u-responsive-ratio--r23by8">
              <Lottie
                loop={false}
                autoplay={true}
                data={logoAnimation}
                renderer="svg"
              />
            </div>
          </div>
          <NewsletterSignup />
        </OneImageBackground>
        <div className="FreshersHomepage__slice FreshersHomepage__slice--events">
          <div className="LokiContainer">
            <h2>With over 100 events,<br/>Freshers Week is for everyone</h2>
            <p>
                          The Students’ Union put on over 100 events for you in Freshers Week alone. We’ve worked hard to make sure there’s something for everyone.
            </p>

            <p>Whether you’re into club nights, bar crawls, puzzles or performances. We’ve got something for you! We have alcohol-free events, events just for post-graduates, and family events.
</p>
            <p>We’re announcing our events on the 20th of August, sign up to our newsletter to hear about Fresher’s Week before anyone else!
</p>


          </div>
        </div>
        <OneImageBackground className="FreshersHomepage__slice FreshersHomepage__slice--preview" src="original_images/5447829aff30461d8a26414b9959212e">
          <h1>Sneak Peek</h1>

        </OneImageBackground>
        <div className="u-responsive-ratio">
          <iframe className="ResponsiveImage" width="560" height="315" src="https://www.youtube-nocookie.com/embed/RpjQI772cDo?rel=0&amp;controls=0&amp;showinfo=0" frameBorder="0" allowFullScreen></iframe></div>
        <div className="FreshersHomepage__slice FreshersHomepage__slice--gt FGT">
          <div className="LokiContainer">
            <div className="FGT__header">
              <h2 className="FGT__heading">Save on the biggest events<br/>with the Freshers Golden Ticket</h2>
              <div className="FGT__ticket">
                <OneImage src="original_images/9c7c9013560746d9b1f3e6135f67523b" aspectRatio={{ width: 1920, height: 1118 }} alt="Golden Ticket" />
              </div>
            </div>

            <div>countdown</div>
            <NewsletterSignup />

            <h3>
              Limited Golden Tickets Available,<br />
              Guaranteed to Sell Out!
            </h3>
          </div>
        </div>
        <div className="FreshersHomepage__slice FreshersHomepage__slice--union FUnion">
          <div className="LokiContainer">
            <h2>We're your Students' Union</h2>
            <div>
              <h3>You'll automatically become a member of the Students' Union</h3>
              <p>
                Your Students’ Union is responsible for running the on-campus shops and bars, putting on events throughout the year, and supporting you through your time at Sussex and beyond.
The Union is independent from the University,
              </p>
            </div>

            <div className="FUnion__areas">
              <div>
                <h3>Societies</h3>
                <p>We have over 200 societies, and you can join as many as you like from the first week.
We help run a whole range of groups including sports, performing arts, political, music,crafts. LGBTQ+ and religious societies, so there’s bound to be something for you. If nothing we have takes your fancy, we can help you start your very own society.
</p>
              </div>
              <div>
                <h3>Jobs</h3>
                <p>We have many jobs on offer for new and returning students. We employ students in our outlets and beyond to help make our Students’ Union the best it can be.
</p>
              </div>
              <div>
                <h3>Campus Services</h3>
                <p>We run all the shops and bars on campus with students/you (?) in mind. We’re for students, not for profit, so there are always great deals.
We also run support services, so if you’re struggling to cope with anything, we’re here to help.</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3>picture of brighton</h3>
        </div>
        <div>
          <div className="LokiContainer">
            <h2>Attend on Facebook</h2>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FreshersHomepage;
