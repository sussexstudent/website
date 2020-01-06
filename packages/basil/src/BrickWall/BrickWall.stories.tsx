import React from 'react';

export default { title: 'Navigation|Brick Wall' };

const options = ['Sports', 'Media', 'Dance', 'Politics & Social Action'];

export const Default: React.FC = () => (
  <ul className="BrickWall List--reset">
    {options.map((v) => (
      <li className="BrickWall__item">
        <button className="BrickWall__anchor" type="button">
          {v}
        </button>
      </li>
    ))}
  </ul>
);
