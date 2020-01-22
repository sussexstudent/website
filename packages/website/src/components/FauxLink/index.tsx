import React from 'react';

export default ({ href }: { href: string }) => (
  <a className="u-faux-link" href={href} />
);

interface InnerLinkProp extends React.AnchorHTMLAttributes<any> {
  className: string;
}

export const InnerLink: React.FC<InnerLinkProp> = ({
  className = '',
  ...props
}) => (
  <a {...props} className={`u-faux-link-inner ${className}`}>
    {props.children}
  </a>
);
