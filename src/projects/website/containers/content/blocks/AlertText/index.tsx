import React from 'react';
import { StreamFieldBlock } from '~website/containers/content/types';
import AlertIcon from '~icons/alert-circle.svg';

export const AlertTextBlock: StreamFieldBlock<{ value: string }> = ({
  block: { value },
}) => {
  return (
    <div className="AlertText type-body-copy ContentBlock">
      <div className="AlertText__icon">
        <AlertIcon />
      </div>
      <div
        className="AlertText__content"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
};
