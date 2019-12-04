import React from 'react';

import { BrandColorCard } from './index';
import { COLORS } from '../style';

export default { title: 'System|Brand Color' };

export const AllColors: React.FC = () => (
  <div>
    {Object.entries(COLORS).map(([name, color]) => (
      <BrandColorCard key={color} color={color} name={name} />
    ))}
  </div>
);
