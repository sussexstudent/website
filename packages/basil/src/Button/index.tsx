import React from 'react';

interface IProps {
  href: string;
  children: any;
  className?: string;
}

export const Button: React.FC<IProps> = ({ href, children, className }) => {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};
