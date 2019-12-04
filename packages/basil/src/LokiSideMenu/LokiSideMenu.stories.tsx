import React from 'react';
import { LokiSideMenu } from '../../../website/src/components/LokiSideMenu/index';

export default { title: 'Page|LokiSideMenu' };
export const Closed: React.FC = () => (
  <LokiSideMenu isOpen={true} onBackdropClick={() => function() {}} />
);
