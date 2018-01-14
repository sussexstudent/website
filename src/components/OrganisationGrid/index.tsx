import React from 'react';
import OrganisationCard from '../OrganisationCard';
import {FalmerImage} from "../../types/events";

export interface StudentGroup {
  link: string;
  name: string;
  description: string;
  image: {
    src: string;
  };
  logo: FalmerImage;
  isProspective: boolean;
  id: number;
  groupId: number;
  mslGroup?: {
    lastSync: string;
  }
}

interface IProps {
  organisations: Array<StudentGroup>
}

export default function OrganisationGrid(props: IProps) {
  const { organisations } = props;
  return (
    <ul className="OrgansiationGrid">
      {organisations.map(org => <OrganisationCard org={org} key={org.id} />)}
    </ul>
  );
}
