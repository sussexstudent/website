import React from 'react';
import { NewsletterSignup } from '../../../components/NewsletterSignup';
import { AspectRatio, OneImageBackground } from '../../../components/OneImage';
import { useCountdown } from '../../../hooks/useCountdown';
import FreshersLogo from '../../../icons/FreshersWeekPlaceholder.svg';
import { Page } from '../types';
import StreamField from '../StreamField';
import { ProfileSliceData, TwoColSliceData } from '../blocks/Freshers';
import slugify from '@ussu/common/src/libs/slugify';

type FreshersSlices = ProfileSliceData | TwoColSliceData;

interface FreshersHomepagePage extends Page {
  countdownCaption: string;
  countdownTarget: string;
  heroText: string;
  content: FreshersSlices[];
}

export interface FreshersHomepageProps {
  page: FreshersHomepagePage;
}

export const FreshersHomepage: React.FC<FreshersHomepageProps> = ({
  page,
  page: { content },
}) => {
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
        <div>
          <ul>
            {content.map((slice) => (
              <li key={slice.id}>
                <a href={`#${slugify(slice.value.menuName)}`}>
                  {slice.value.menuName}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <StreamField page={page} items={content} />
      </div>
    </React.Fragment>
  );
};
