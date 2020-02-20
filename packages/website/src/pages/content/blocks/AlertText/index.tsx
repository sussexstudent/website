import React from 'react';
import AlertIcon from '@ussu/common/src/icons/alert-circle.svg';
import {
  StreamFieldBlock,
  StreamFieldBlockData,
} from '@ussu/common/src/types/content';

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
