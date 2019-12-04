import React from 'react';

export const Tags: React.FC = ({ children }) => {
  return <ul className="List List--reset Tags">{children}</ul>;
};

export const Tag: React.FC = ({ children }) => {
  return <li className="Tags__tag">{children}</li>;
};
