import React from 'react';

export default ({ href }: { href: string }) => (
  <a className="u-faux-link" href={href} />
);

interface IInnerLinkProp extends React.AnchorHTMLAttributes<any> {
  className: string;
}

export const InnerLink = ({ className = '', ...props }: IInnerLinkProp) => (
  <a {...props} className={`u-faux-link-inner ${className}`}>
    {props.children}
  </a>
);
