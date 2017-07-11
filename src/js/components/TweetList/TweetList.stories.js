import React from 'react';
import { storiesOf } from '@storybook/react';
import TweetList from './index';

storiesOf('TweetList', module).add('standard', () =>
  <TweetList
    query="list/ussu,ussu"
    signature="f1b9176fddbe7114295eb4bfc65070c5a130a94d"
  />
);
