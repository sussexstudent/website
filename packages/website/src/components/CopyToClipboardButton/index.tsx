import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

interface IProps {
  value: string;
}

export const CopyToClipboardButton: React.FC<IProps> = ({
  value,
  children,
}) => {
  const [hasCopied, setHasCopied] = useState(false);

  return (
    <CopyToClipboard text={value} onCopy={() => setHasCopied(true)}>
      <button className="Button">{hasCopied ? 'Copied!' : children}</button>
    </CopyToClipboard>
  );
};
