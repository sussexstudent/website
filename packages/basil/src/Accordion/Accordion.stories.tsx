import React from 'react';

import { Accordion } from './index';

export default { title: 'Navigation|Accordion' };
export const Closed: React.FC = () => <Accordion isOpen={false} />;
export const Open: React.FC = () => <Accordion isOpen={true} />;
