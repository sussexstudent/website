import React, { useState } from 'react';
import { Modal } from '~components/Modal';
import FalmerMediaList from '~falmer/containers/FalmerMedia/FalmerMediaList';

interface Props {
  value: number | null;
  onChange: (imageId: number) => void;
}

export const FalmerImageSelector: React.FC<Props> = ({ value, onChange }) => {
  const [isModalOpen, handleModal] = useState(false);

  return (
    <div>
      <div>Selected: {value === null ? 'nothing' : value}</div>

      <button className="Button" onClick={() => handleModal(true)}>
        Select Image
      </button>

      <Modal
        isOpen={isModalOpen}
        // onAfterOpen={afterOpenFn}
        onRequestClose={() => handleModal(false)}
        // closeTimeoutMS={n}
        // style={customStyle}
        size={'full'}
        contentLabel="Modal"
      >
        <h1>Select an image</h1>
        <FalmerMediaList
          onSelect={(id) => {
            onChange(id);
            handleModal(false);
          }}
        />
      </Modal>
    </div>
  );
};
