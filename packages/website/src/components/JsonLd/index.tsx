import React from 'react';

// eslint-disable-next-line
export const JsonLd: React.FC<{ data: any }> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
