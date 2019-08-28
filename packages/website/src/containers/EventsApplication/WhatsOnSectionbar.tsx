import React from 'react';
import { Sectionbar, SectionbarItem } from '../../components/Sectionbar';
import { Link } from 'react-router-dom';
import LIVE_BRANDING_PERIOD_QUERY from './LiveBrandingPeriods.graphql';
import { useQuery } from '@apollo/react-hooks';
import { Brand } from '@ussu/common/src/types/events';

export const WhatsOnSectionbar = () => {
  const { data } = useQuery(LIVE_BRANDING_PERIOD_QUERY);

  return (
    <Sectionbar title="What's on">
      <SectionbarItem>
        <Link to={'/whats-on'}>All listings</Link>
      </SectionbarItem>

      <SectionbarItem>
        <Link to={'/whats-on/my-programme'}>My Programme</Link>
      </SectionbarItem>

      {data && data.allBrandingPeriods && data.allBrandingPeriods.length > 0
        ? data.allBrandingPeriods.map((period: Brand) => (
            <SectionbarItem key={period.slug}>
              <Link to={`/whats-on/periods/${period.slug}`}>{period.name}</Link>
            </SectionbarItem>
          ))
        : null}
      <SectionbarItem>
        <a
          href={
            'https://www.sussexstudent.com/get-involved/societies-and-student-media/guides/events/hold-event'
          }
        >
          Hold an event
        </a>
      </SectionbarItem>
    </Sectionbar>
  );
};
