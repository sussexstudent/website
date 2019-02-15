import React from 'react';
import { InternalAppLink } from '~components/InternalAppLink';
import { Link } from 'react-router-dom';

export default ({ href }: { href: string }) => (
  <InternalAppLink className="u-faux-link" to={href} />
);

export const FauxRouterLinkNonIAL = ({ href }: { href: string }) => (
  <Link className="u-faux-link" to={href} />
);

export const InnerLink = ({
  className = '',
  ...props
}: {
  to: string;
  [attr: string]: any;
}) => (
  <InternalAppLink {...props} className={`u-faux-link-inner ${className}`}>
    {props.children}
  </InternalAppLink>
);
