import React from 'react';

interface IProps {
  name: string;
  screenName: string;
}

const TweetHeader = ({ name, screenName }: IProps) => (
  <div className="Tweet__header">
    <span className="Tweet__name">{name}</span>
    <span className="Tweet__screen-name">@{screenName}</span>
  </div>
);

export default TweetHeader;
