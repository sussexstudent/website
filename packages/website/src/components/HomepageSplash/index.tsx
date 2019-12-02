import React from 'react';
import { basicTimer, Typer } from '../Typer';
import { shuffle } from 'lodash';
import { COLORS } from '@ussu/basil/src/style';
import { OneImageBackground } from '../OneImage';

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
    src="original_images/7ee2fc8daf2e4f93bea953d9e86c32ee"
    css={{
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
    }}
  >
    <div className="LokiContainer">
      <div className="HomepageSplash__inner" css={{ color: COLORS.WHITE }}>
        <Typer
          timer={basicTimer}
          lines={placeholderHints}
          render={({ value }) => (
            <React.Fragment>
              <div className="HomepageSplash__heading">
                {"Sussex Students' Union for"}
              </div>
              <div className="HomepageSplash__heading">{value}&nbsp;</div>
            </React.Fragment>
          )}
        />
      </div>
    </div>
  </OneImageBackground>
);

export const HomepageSplash = HomepageSplashComponent;
