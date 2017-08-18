import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line jsx-a11y/anchor-has-content
export default ({ href }) => <Link className="u-faux-link" to={href} />;

export const InnerLink = ({ className = '', ...props }) =>
  <Link {...props} className={`u-faux-link-inner ${className}`}>
    {props.children}
  </Link>;
