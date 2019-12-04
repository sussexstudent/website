import React from 'react';

import { CrossIcon } from '../../../website/src/components/CrossIcon';
import { MenuIcon } from '../../../website/src/components/MenuIcon';
import { SearchIcon } from '../../../website/src/components/SearchIcon';

export default { title: 'Utils|Icons' };

export const Search: React.FC = () => <SearchIcon />;
export const Menu: React.FC = () => <MenuIcon />;
export const Cross: React.FC = () => <CrossIcon />;
