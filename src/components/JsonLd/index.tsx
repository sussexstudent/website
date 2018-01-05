import React from 'react';

/* eslint-disable react/no-danger */
export default ({ data }: { data: Object }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
/* eslint-enable react/no-danger */
