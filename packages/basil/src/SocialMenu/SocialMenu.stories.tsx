import React from 'react';
import { SocialMenu } from '../../../website/src/components/SocialMenu/index';

export default { title: 'SocialMenu' };

export const Standard = () => <SocialMenu />;
export const Mobile = () => <SocialMenu mobile />;
export const List = () => <SocialMenu asList mobile />;
