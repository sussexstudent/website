import React from 'react';
import { Loader } from '../../../website/src/components/Loader';

export default { title: 'Utils|Loader' };

export const Light: React.FC = () => <Loader />;
export const Dark: React.FC = () => <Loader dark />;
