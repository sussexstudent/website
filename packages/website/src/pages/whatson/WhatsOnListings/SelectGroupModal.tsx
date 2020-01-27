import React from 'react';
import { Modal } from '../../../components/Modal';

interface SelectGroupModalProps {
  isOpen: boolean;
  data: any[];
}

export const SelectGroupModal: React.FC<SelectGroupModalProps &
  ReactModal.Props> = ({ data, ...props }) => {
  return (
    <Modal size="normal" {...props} footerClose>
      <h2 className="Modal__heading">Filter by group</h2>
      <ul>
        {data.map((type: any) => (
          <li>
            <button>{type.name}</button>
          </li>
        ))}
      </ul>
    </Modal>
  );
};
