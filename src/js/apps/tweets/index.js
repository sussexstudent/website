import React from 'react';
import ReactDOM from 'react-dom';
import TweetList from '../../components/TweetList';

import data from './list-ussu-ussu.json';

ReactDOM.render(<TweetList tweets={data} />, document.querySelector('.app__tweets'));
