import React from 'react';
import { basicTimer, Typer } from '../Typer';
import { shuffle } from 'lodash';
import { COLORS, MQ } from '@ussu/common/src/libs/style';

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
  <div
    className="HomepageSplash"
    css={{
      backgroundImage: `url(http://falmer.sussexstudent.com/images/OUMWnhdR0NGUUg3NgEbiUcKfzlo=/2745/original/)`,
      backgroundPositionX: '10%',
      [MQ.Medium]: { backgroundPositionX: 'center' },
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
  </div>
);

export const HomepageSplash = HomepageSplashComponent;
