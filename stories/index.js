import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BackBar from '../src/js/components/BackBar/index';
import ContentCard from '../src/js/components/ContentCard';
import ContentNavigation from '../src/js/components/ContentNavigation';
import Loader from '../src/js/components/Loader';
import HeadingHero from '../src/js/components/HeadingHero';

storiesOf('BackBar', module)
  .add('with text', () =>
    <BackBar onClick={action('clicked')}>Hello Button</BackBar>
  )
  .add('supports brand color', () =>
    <div>
      <BackBar color="red">Support</BackBar>
      <BackBar color="green">{"What's on"}</BackBar>
      <BackBar color="blue">Latest news</BackBar>
    </div>
  );

storiesOf('ContentCard', module).add('with text', () =>
  <ContentCard>Hello Content!</ContentCard>
);

storiesOf('ContentNavigation', module).add('default', () =>
  <ContentNavigation
    activeKey="boats"
    items={[
      { anchor: 'animals', name: 'Animals' },
      { anchor: 'boats', name: 'Boats' },
      { anchor: 'cars', name: 'Cars' },
    ]}
  />
);

storiesOf('Loader', module)
  .add('light', () => <Loader dark />)
  .add('dark', () =>
    <div
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#333333',
      }}
    >
      <Loader />
    </div>
  );

storiesOf('HeadingHero', module)
  .add('title only', () =>
    <div className="Container">
      <HeadingHero
        imageURL="/images/4219b2966c1047dd8fe4bfa2aa922c72.original.jpg"
        title={'Our holiday opening times'}
      />
    </div>
  )
  .add('width description', () =>
    <div className="Container">
      <HeadingHero
        imageURL="/images/4219b2966c1047dd8fe4bfa2aa922c72.original.jpg"
        title="Beware of seagulls"
        description="They are everywhere. They will get you."
      />
    </div>
  );
