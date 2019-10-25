import { storiesOf } from '@storybook/react';
import { BannerOutlet } from '../../../website/src/components/BannerOutlet/index';

storiesOf('Banner Outlet', module).add('standard', () => (
  <BannerOutlet outlet="login.modal.top" />
));
