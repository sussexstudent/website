import React from 'react';
import { InternalAppLink } from '~components/InternalAppLink';

export default ({ href }: { href: string }) => (
  <InternalAppLink className="u-faux-link" to={href} />
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
