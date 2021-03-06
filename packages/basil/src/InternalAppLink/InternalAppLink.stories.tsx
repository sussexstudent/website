import React from 'react';
import { InternalAppLink } from '../../../website/src/components/InternalAppLink/index';

export default { title: 'Utils|Internal App Link' };

export const Standard: React.FC = () => (
  <InternalAppLink to="#">Test internal app link</InternalAppLink>
);
