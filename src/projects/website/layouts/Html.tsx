import React from 'react';
import { headContent } from '../head';

interface IProps {
  assets: any; // todo
  children: any;
  additionalHead: Array<string>;
}

const HTML = ({ children, assets, additionalHead = [] }: IProps) => (
  <html lang="en">
    <head
      dangerouslySetInnerHTML={{
        __html: headContent(assets, ...additionalHead),
      }}
    />
    {children}
  </html>
);

export default HTML;
