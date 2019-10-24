import React from 'react';
import { css } from '@emotion/core';

interface BrandColorCardProps {
  color: string;
}

export const BrandColorCard: React.FC<BrandColorCardProps> = ({ color }) => (
  <div className="ContentCard" css={css({ backgroundColor: color })}>
    <span>{color}</span>
  </div>
);
