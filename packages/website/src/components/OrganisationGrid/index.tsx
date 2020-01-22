import React from 'react';
import { OrganisationCard } from '../OrganisationCard';
import { StudentGroupFragmentFragment } from '../../generated/graphql';

interface OrganisationGridProps {
  organisations: StudentGroupFragmentFragment[];
}

export const OrganisationGrid: React.FC<OrganisationGridProps> = (props) => {
  const { organisations } = props;
  return (
    <ul className="TrailGrid TrailGrid--large">
      {organisations.map((org) => (
        <OrganisationCard org={org} key={org.groupId} />
      ))}
    </ul>
  );
};
