import React from 'react';
import { css } from '@emotion/core';

interface BrandColorCardProps {
  color: string;
  name: string;
}

export const BrandColorCard: React.FC<BrandColorCardProps> = ({
  name,
  color,
}) => (
  <div className="ContentCard" css={css({ backgroundColor: color })}>
    <span>
      {name} - {color}
    </span>
  </div>
);
