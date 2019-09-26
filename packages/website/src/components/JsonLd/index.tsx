import React from 'react';

export const JsonLd = ({ data }: { data: Object }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
