import React from 'react';
import OrganisationCard from '../OrganisationCard';
import { StudentGroup } from '@ussu/common/src/types/groups';

interface IProps {
  organisations: StudentGroup[];
}

export default function OrganisationGrid(props: IProps) {
  const { organisations } = props;
  return (
    <ul className="TrailGrid TrailGrid--large">
      {organisations.map((org) => (
        <OrganisationCard org={org} key={org.groupId} />
      ))}
    </ul>
  );
}
