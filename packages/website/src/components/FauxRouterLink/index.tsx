import React from 'react';
import { InternalAppLink } from '../InternalAppLink';
import { Link } from 'react-router-dom';

export default ({ href }: { href: string }) => (
  <InternalAppLink className="u-faux-link" to={href} />
);

export const FauxRouterLinkNonIAL = ({ href }: { href: string }) => (
  <Link className="u-faux-link" to={href} />
);

export const InnerLink: React.FC<{
  to: string;
  [attr: string]: any;
}> = ({ className = '', ...props }) => (
  <InternalAppLink {...props} className={`u-faux-link-inner ${className}`}>
    {props.children}
  </InternalAppLink>
);
