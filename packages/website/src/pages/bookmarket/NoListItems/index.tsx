import React from 'react';
import SadFaceIcon from '@ussu/common/src/icons/sad-face.svg';

export const NoListItems = ({ heading = 'No results match the criteria!' }) => (
  <div className="Stonewall">
    <SadFaceIcon className="Stonewall__image" />
    <h1 className="type-double-pica">{heading}</h1>
  </div>
);
