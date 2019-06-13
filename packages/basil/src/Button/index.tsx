import React from 'react';

interface IProps {
  href: string;
  children: any;
}

export const ButtonLink: React.FC<IProps> = ({ href, children }) => {
  return (
    <a className={'Button'} href={href}>
      {children}
    </a>
  );
};

