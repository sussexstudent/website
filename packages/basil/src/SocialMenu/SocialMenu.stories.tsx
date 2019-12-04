import React from 'react';
import { SocialMenu } from '../../../website/src/components/SocialMenu/index';

export default { title: 'SocialMenu' };

export const Standard: React.FC = () => <SocialMenu />;
export const Mobile: React.FC = () => <SocialMenu mobile />;
export const List: React.FC = () => <SocialMenu asList mobile />;
