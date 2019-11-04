import { storiesOf } from '@storybook/react';
import { CrossIcon } from '../../../website/src/components/CrossIcon';
import { MenuIcon } from '../../../website/src/components/MenuIcon';
import { SearchIcon } from '../../../website/src/components/SearchIcon';

storiesOf('Icons', module)
  .add('Search', () => <SearchIcon />)
  .add('Menu', () => <MenuIcon />)
  .add('Cross', () => <CrossIcon />);
