import React from 'react';

const Item = ({ name, link }) => (
  <li className="PrefooterMenu__column-item">
    <a href={link}>{name}</a>
  </li>
);

Item.propTypes = {
  name: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
};

const Column = ({ name, link, children }) => (
  <ul className="PrefooterMenu__column">
    <li className="PrefooterMenu__column-header">
      <a href={link}>{name}</a>
    </li>
    {children}
  </ul>
);

Column.propTypes = {
  name: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
};

const PrefooterMenu = () => (
  <div className="PrefooterMenu">
    <div className="Container PrefooterMenu__inner">
      <Column name="Get involved" link="/get-involved">
        <Item name="Societies" link="/get-involved/societies" />
        <Item name="Cafe" link="/get-involved/cafe" />
      </Column>
      <Column name="What's on" link="/whats-on">
        <Item name="Events" link="/whats-on/events" />
        <Item name="Bars & Venues" link="/get-involved/cafe" />
        <Item name="Freshers & Refreshers" link="/get-involved/cafe" />
      </Column>
      <Column name="About us" link="/whats-on">
        <Item name="Council" link="/whats-on/events" />
        <Item name="Campaigns" link="/get-involved/cafe" />
        <Item name="Policy" link="/get-involved/cafe" />
      </Column>
      <Column name="Support" link="/whats-on">
        <Item name="Accademic issues" link="/whats-on/events" />
        <Item name="Complaints" link="/get-involved/cafe" />
      </Column>
    </div>
  </div>
);

export default PrefooterMenu;
