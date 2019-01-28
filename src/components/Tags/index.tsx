import React from 'react';

interface TagsProps {}

export const Tags: React.FC<TagsProps> = ({ children }) => {
  return <ul className="List List--reset Tags">{children}</ul>;
};

interface TagProps {}

export const Tag: React.FC<TagProps> = ({ children }) => {
  return <li className="Tags__tag">{children}</li>;
};
