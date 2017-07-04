import React from 'react';

// eslint-disable-next-line jsx-a11y/anchor-has-content
export default ({ href }) => <a className="u-faux-link" href={href} />;

export const InnerLink = ({ className = '', ...props }) =>
  <a {...props} className={`u-faux-link-inner ${className}`}>
    {props.children}
  </a>;
