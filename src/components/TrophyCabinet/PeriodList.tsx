import React from 'react';
import { getGrade, Icon } from '~components/TrophyCabinet/utils';
import { Award } from '~components/TrophyCabinet/Award';
import { AwardPeriod } from '~types/awards';

export function PeriodList({ data }: { data: AwardPeriod[] }) {
  return (
    <ul className="List List--reset">
      {data.map((awardPeriod) => (
        <li>
          <h3>
            {awardPeriod.authority.name} - {awardPeriod.displayName}
          </h3>
          <ul className="TrophyCabinet__awards List--reset">
            {awardPeriod.awarded.map((awarded) => (
              <li>
                <Award
                  color={getGrade(awarded, awardPeriod.authority).color}
                  link={awarded.award.link}
                  title={awarded.award.name}
                  description={
                    awarded.award.description || 'No description provided'
                  }
                  subtitle={getGrade(awarded, awardPeriod.authority).title}
                >
                  <Icon name={awarded.award.icon.toLowerCase()} />
                </Award>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
