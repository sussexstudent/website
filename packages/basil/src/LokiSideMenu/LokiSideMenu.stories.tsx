import React from 'react';
import { LokiSideMenu } from '../../../website/src/components/LokiSideMenu/index';

export default { title: 'Page|LokiSideMenu' };
export const Closed = () => (
  <LokiSideMenu isOpen={true} onBackdropClick={() => function() {}} />
);
