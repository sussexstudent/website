import React from 'react';
import { CopyToClipboardButton } from '../../../website/src/components/CopyToClipboardButton/index';

export default { title: 'Utils|Copy to clipboard' };

export const Default = () => (
  <CopyToClipboardButton value="test value to copy">
    Copy sharing link
  </CopyToClipboardButton>
);
