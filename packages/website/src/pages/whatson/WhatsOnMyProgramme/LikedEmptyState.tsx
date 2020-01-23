import React from 'react';
import Image from '../../../icons/liked-events-state.svg';
import { COLORS } from '@ussu/basil/src/style';

interface LikedEmptyStateProps {
  title: string;
  description: string;
}

export const LikedEmptyState: React.FC<LikedEmptyStateProps> = ({
  title,
  description,
}) => (
  <div
    css={{
      maxWidth: 1024,
      width: '85%',
      margin: '2rem auto',
      border: `1px solid ${COLORS.GREY_SPRING}`,
      borderRadius: 6,
      overflow: 'hidden',
      textAlign: 'center',
      background: '#E3F2F8',
    }}
  >
    <h1>{title}</h1>
    <p>{description}</p>
    <Image />
  </div>
);
