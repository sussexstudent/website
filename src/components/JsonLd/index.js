import React from 'react';

/* eslint-disable react/no-danger */
export default ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);
/* eslint-enable react/no-danger */
