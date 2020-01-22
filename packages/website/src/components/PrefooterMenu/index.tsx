import React from 'react';

interface ItemProps {
  name: string;
  link: string;
}

const Item: React.FC<ItemProps> = ({ name, link }) => (
  <li className="PrefooterMenu__column-item">
    <a href={link}>{name}</a>
  </li>
);

interface ColumnProps {
  name: string;
  link: string;
}

const Column: React.FC<ColumnProps> = ({ name, link, children }) => (
  <ul className="PrefooterMenu__column">
    <li className="PrefooterMenu__column-header">
      <a href={link}>{name}</a>
    </li>
    {children}
  </ul>
);

export const PrefooterMenu: React.FC = () => (
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
