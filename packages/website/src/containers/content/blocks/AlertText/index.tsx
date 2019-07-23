import React from 'react';
import { StreamFieldBlock, StreamFieldBlockData } from '../../types';
import AlertIcon from '@ussu/common/src/icons/alert-circle.svg';

export type AlertTextBlockData = StreamFieldBlockData<
  'alert_text',
  {
    value: string;
  }
>;

export const AlertTextBlock: StreamFieldBlock<AlertTextBlockData> = ({
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
