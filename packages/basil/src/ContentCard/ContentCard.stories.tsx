import React from 'react';

import { ContentCard } from './index';

export default { title: 'ContentCard' };

export const Standard: React.FC = () => (
  <ContentCard>
    <h1>Hello there</h1>
    <h2>This is a content card with content inside.</h2>
  </ContentCard>
);

export const Error: React.FC = () => (
  <ContentCard className="ContentCard__error-message">
    <span>This is an error message in a content card</span>
  </ContentCard>
);
