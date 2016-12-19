import React from 'react';

export const tweetType = {
  username: React.PropTypes.string,
};

export const tweetListType = React.PropTypes.arrayOf(tweetType);
