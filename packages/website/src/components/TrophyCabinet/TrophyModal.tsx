import React from 'react';
import { Modal } from '../Modal';
import { AwardPeriod } from '@ussu/common/src/types/awards';
import { PeriodList } from './PeriodList';

interface TrophyModalProps {
  isOpen: boolean;
  data: AwardPeriod[];
}

export const TrophyModal: React.FC<TrophyModalProps & ReactModal.Props> = (
  props,
) => {
  return (
    <Modal size="normal" {...props} footerClose>
      <h2 className="Modal__heading">Trophy Cabinet</h2>
      {props.data.length > 0 ? (
        <PeriodList data={props.data} />
      ) : (
        <div className="ContentCard__error-message">
          <span>No awards to be found! (yet)</span>
        </div>
      )}
    </Modal>
  );
};
