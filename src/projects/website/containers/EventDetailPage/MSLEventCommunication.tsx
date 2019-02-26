import React, { useCallback, useEffect } from 'react';
import { replacePageActions } from '~website/ducks/page';
import { useDispatch } from 'redux-react-hook';

interface IProps {
  ticketData: string;
  onData(data: any): void;
}

export const MSLEventCommunication: React.FC<IProps> = ({
  ticketData,
  onData,
}) => {
  const dispatch = useDispatch();
  const handleMessage = useCallback((e: MessageEvent) => {
    const data = e.data;
    if (data.source === 'ussu-msl-frame-initial-data') {
      onData(data.payload);

      if (data.payload.pageMenuOptions) {
        dispatch(replacePageActions(data.payload.pageMenuOptions));
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <iframe
      style={{ display: 'none' }}
      src={`${ticketData}#communication`}
      frameBorder="0"
    />
  );
};
