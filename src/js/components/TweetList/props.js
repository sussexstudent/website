import React from 'react';

export const tweetType = React.PropTypes.shape({
  username: React.PropTypes.string,
});

export const tweetListType = React.PropTypes.arrayOf(tweetType);
