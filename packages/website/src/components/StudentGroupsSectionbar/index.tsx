import React from 'react';
import { Sectionbar, SectionbarItem } from '../Sectionbar';
import { InternalAppLink } from '../InternalAppLink';

export const StudentGroupsSectionbar = () => {
  return (
    <Sectionbar title="Societies, sports & media">
      <SectionbarItem>
        <InternalAppLink to={'/sport-societies-media/discover'}>
          Discover
        </InternalAppLink>
      </SectionbarItem>
    </Sectionbar>
  );
};
