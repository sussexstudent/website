import React from 'react';

interface TagsProps {}

export const Tags: React.SFC<TagsProps> = ({ children }) => {
  return <ul className="List List--reset">{children}</ul>;
};

interface TagProps {}

export const Tag: React.SFC<TagProps> = ({ children }) => {
  return <li>{children}</li>;
};
