import React from 'react';
import { storiesOf } from '@storybook/react';
import { Storybase } from '~components/Storybase';
import { Sectionbar, SectionbarItem } from '~components/Sectionbar/index';

storiesOf('Sectionbar', module)
  .addDecorator(Storybase())
  .addDecorator((story) => <div style={{ paddingTop: '1rem' }}>{story()}</div>)
  .add('empty', () => <Sectionbar title="Sectionbar" />)
  .add('with nav items', () => (
    <Sectionbar title="Sectionbar">
      <SectionbarItem>
        <a href="#">Home</a>
      </SectionbarItem>
      <SectionbarItem>
        <a href="#">Discover</a>
      </SectionbarItem>
      <SectionbarItem>
        <a href="#">Add a listing</a>
      </SectionbarItem>
    </Sectionbar>
  ));
