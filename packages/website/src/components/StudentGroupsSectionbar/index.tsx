import React from 'react';
import { Wayfinder, WayfinderItem, WayfinderTopLevel } from '../Wayfinder';

export const StudentGroupsSectionbar: React.FC = () => {
  return (
    <Wayfinder>
      <WayfinderTopLevel
        title="Societies, sports & media"
        to="/sport-societies-media"
      >
        {[
          <WayfinderItem key={1} to={'/sport-societies-media/discover'}>
            Discover
          </WayfinderItem>,
        ]}
      </WayfinderTopLevel>
    </Wayfinder>
  );
};
