import React from 'react';

interface ContentCardProps {
  anchor?: string;
  bleed?: boolean;
  className?: string;
}

export const ContentCardContent: React.FC = ({ children }) => (
  <div className="ContentCard ContentCard__content">{children}</div>
);

export const ContentCard: React.FC<ContentCardProps> = ({
  anchor = undefined,
  children,
  className,
  ...props
}) => (
  <div className={`ContentCard ${className ? className : ''}`} {...props}>
    {anchor !== undefined ? (
      <span className="u-position-anchor" id={anchor} />
    ) : null}
    {children}
  </div>
);
