import React from 'react';
import { Link } from 'react-router-dom';
import {StreamFieldBlock} from "~components/content/types";

export const ExternalLink: StreamFieldBlock<{ link: string; target: any; title: string }> = ({ block: { link, title } }) => {
  return (
    <a className="Button" href={link}>{title}</a>
  )
};

export const InternalLink: StreamFieldBlock<{ link: string; target: any; title: string }> = ({ block: { link, title } }) => {
  return (
    <Link className="Button" to={link}>{title}</Link>
  )
};
