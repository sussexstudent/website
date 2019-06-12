import React from 'react';
import { NewsletterSignup } from '~components/NewsletterSignup';
import { AspectRatio, OneImageBackground } from '~components/OneImage';
import { useCountdown } from 'src/hooks/useCountdown';
import FreshersLogo from '~icons/FreshersWeekPlaceholder.svg';

const FreshersHomepage: React.FC = () => {
  const countdown = useCountdown(new Date(2019, 9, 21, 12, 0, 0));

  return (
    <React.Fragment>
      <div className="FreshersHomepage">
        <OneImageBackground
          className="SplashSlice"
          src="original_images/aef7c351fec64f5eb14ba9e8823e7940"
          aspectRatio={AspectRatio.r16by9}
        >
          <div className="FreshersLogoContainer">
            <FreshersLogo />
            <h1>COMING SOON</h1>
            <div className="FGT__countdown FGT__countdownFreshers">
              <div className="countdown_item">
                <div className="countdown_value">{countdown.days}</div>
                <div className="countdown_label">
                  day{countdown.days !== 1 ? 's' : null}
                </div>
              </div>
              <div className="countdown_item">
                <div className="countdown_value">{countdown.hours}</div>
                <div className="countdown_label">
                  hour{countdown.hours !== 1 ? 's' : null}
                </div>
              </div>
              <div className="countdown_item">
                <div className="countdown_value">{countdown.minutes}</div>
                <div className="countdown_label">
                  minute{countdown.minutes !== 1 ? 's' : null}
                </div>
              </div>
              <div className="countdown_item">
                <div className="countdown_value">{countdown.seconds}</div>
                <div className="countdown_label">
                  second{countdown.seconds !== 1 ? 's' : null}
                </div>
              </div>
            </div>
          </div>
          <NewsletterSignup />
        </OneImageBackground>
      </div>
    </React.Fragment>
  );
};

export default FreshersHomepage;
