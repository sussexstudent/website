import React from 'react';
import { SocialMenu } from '../../../website/src/components/SocialMenu/index';
import { COLORS } from '../style';

export default { title: 'SocialMenu' };

export const Standard: React.FC = () => (
  <div style={{ background: COLORS.BRAND_PRIMARY, padding: '1rem' }}>
    <SocialMenu />
  </div>
);
export const Mobile: React.FC = () => <SocialMenu mobile />;
export const List: React.FC = () => <SocialMenu asList mobile />;
