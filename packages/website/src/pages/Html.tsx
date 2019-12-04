import React from 'react';
import { headContent } from '../head';
import { CompProvider } from '../components/CompProviders';

interface HTMLProps {
  assets: any;
  additionalHead: string[];
}

export const Html: React.FC<HTMLProps> = ({
  children,
  assets,
  additionalHead = [],
}) => (
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
