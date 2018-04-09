import React from 'react';
import { Link } from 'react-router-dom';
import { StreamFieldBlock } from '~components/content/types';
import { normaliseContentLink } from '~components/content/utils';

export const ExternalLink: StreamFieldBlock<{
  link: string;
  target: any;
  title: string;
}> = ({ block: { link, title } }) => {
  return (
    <a className="Button" href={normaliseContentLink(link)}>
      {title}
    </a>
  );
};

export const InternalLink: StreamFieldBlock<{
  link: {
    path: string;
  };
  target: any;
  title: string;
}> = ({ block: { link, title } }) => {
  return (
    <Link className="Button" to={link.path}>
      {title}
    </Link>
  );
};
