import React from 'react';
import { OneImageBackground } from '~components/OneImage';
import { basicTimer, Typer } from '~components/Typer';
import { shuffle } from 'lodash';

const placeholderHints = shuffle([
  'support',
  'events',
  'freshers',
  'societies',
  'sports',
  'language café',
  'buddy scheme',
  'jobs',
]);

const HomepageSplashComponent = () => (
  <OneImageBackground
    className="HomepageSplash"
    src="original_images/63b813ed4eb54ee6b07ac2b29a478b18"
  >
    <div className="LokiContainer">
      <div className="HomepageSplash__inner">
        <Typer
          timer={basicTimer}
          lines={placeholderHints}
          render={({ value }) => (
            <React.Fragment>
              <div className="HomepageSplash__heading">Your union for</div>
              <div className="HomepageSplash__heading">{value}&nbsp;</div>
            </React.Fragment>
          )}
        />
      </div>
    </div>
  </OneImageBackground>
);

export const HomepageSplash = HomepageSplashComponent;
