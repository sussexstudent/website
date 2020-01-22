import React from 'react';
import { Modal } from '../Modal';
import { PeriodList } from './PeriodList';
import { AwardsPeriodFragment } from '../../generated/graphql';

interface TrophyModalProps {
  isOpen: boolean;
  data: AwardsPeriodFragment[];
}

export const TrophyModal: React.FC<TrophyModalProps & ReactModal.Props> = ({
  data,
  ...props
}) => {
  return (
    <Modal size="normal" {...props} footerClose>
      <h2 className="Modal__heading">Trophy Cabinet</h2>
      {data.length > 0 ? (
        <PeriodList data={data} />
      ) : (
        <div className="ContentCard__error-message">
          <span>No awards to be found! (yet)</span>
        </div>
      )}
    </Modal>
  );
};
