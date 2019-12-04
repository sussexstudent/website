import React from 'react';
import {
  Sectionbar,
  SectionbarItem,
} from '../../../website/src/components/Sectionbar/index';

export default { title: 'Navigation|Sectionbar' };

export const Empty: React.FC = () => <Sectionbar title="Sectionbar" />;
export const WithNavItems: React.FC = () => (
  <Sectionbar title="Sectionbar">
    <SectionbarItem>
      <a href="#">Home</a>
    </SectionbarItem>
    <SectionbarItem>
      <a href="#">Discover</a>
    </SectionbarItem>
    <SectionbarItem>
      <a href="#">Add a listing</a>
    </SectionbarItem>
  </Sectionbar>
);
