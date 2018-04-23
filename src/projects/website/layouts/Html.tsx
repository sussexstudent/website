import React from 'react';
import { headContent } from '../head';
import CompProvider from '~components/CompProviders';

interface IProps {
  assets: any; // todo
  children: any;
  additionalHead: string[];
}

const HTML = ({ children, assets, additionalHead = [] }: IProps) => (
  <CompProvider>
    <html lang="en">
      <head
        dangerouslySetInnerHTML={{
          __html: headContent(assets, ...additionalHead),
        }}
      />
      {children}
    </html>
  </CompProvider>
);

export default HTML;
