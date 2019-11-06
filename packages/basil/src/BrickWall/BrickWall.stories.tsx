export default { title: 'Navigation|Brick Wall' };

export const Default = () => (
  <ul className="BrickWall List--reset">
    <li className="BrickWall__item">
      <button className="BrickWall__anchor" type="button">
        Sports
      </button>
    </li>
    <li className="BrickWall__item">
      <button className="BrickWall__anchor" type="button">
        Media
      </button>
    </li>
    <li className="BrickWall__item">
      <button className="BrickWall__anchor" type="button">
        Dance
      </button>
    </li>
    <li className="BrickWall__item">
      <button className="BrickWall__anchor" type="button">
        Politics &amp; Social Action
      </button>
    </li>
  </ul>
);
