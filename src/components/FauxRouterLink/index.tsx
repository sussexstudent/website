import React from 'react';
import { Link } from 'react-router-dom';

export default ({ href }: { href: string }) => (
  <Link className="u-faux-link" to={href} />
);

export const InnerLink = ({
  className = '',
  ...props
}: {
  to: string;
  [attr: string]: any;
}) => (
  <Link {...props} className={`u-faux-link-inner ${className}`}>
    {props.children}
  </Link>
);
