import React from 'react';
import { headContent } from '../head';
import { CompProvider } from '../components/CompProviders';

interface HTMLProps {
  assets: any; // todo
  children: any;
  additionalHead: string[];
}

export const HTML = ({ children, assets, additionalHead = [] }: HTMLProps) => (
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
