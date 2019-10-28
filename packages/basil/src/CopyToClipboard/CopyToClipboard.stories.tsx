import { storiesOf } from '@storybook/react';
import { CopyToClipboardButton } from '../../../website/src/components/CopyToClipboardButton/index';

storiesOf('Copy to clipboard', module).add('default', () => (
  <CopyToClipboardButton value="test value to copy">
    Copy sharing link
  </CopyToClipboardButton>
));
