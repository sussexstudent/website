import React from 'react';
import { storiesOf } from '@storybook/react';
import { Storybase } from '~components/Storybase';
import SearchResult from '~components/SearchResult/index';

storiesOf('SearchResult', module)
  .addDecorator(Storybase())
  .add('default', () => (
    <div className="LokiContainer">
      <ul className="ResultsList">
        <SearchResult
          item={{
            link: '/organisation/sketchcomedy/',
            title: 'Comedy Society',
            description: '',
          }}
        />
        <SearchResult
          item={{
            link: '/organisation/sketchcomedy/',
            title: 'Comedy Society',
            description: '',
          }}
        />
        <SearchResult
          item={{
            link: '/organisation/sketchcomedy/',
            title: 'Comedy Society',
            description: '',
          }}
        />
        <SearchResult
          item={{
            link: '/organisation/sketchcomedy/',
            title: 'Comedy Society',
            description: '',
          }}
        />
      </ul>
    </div>
  ));
