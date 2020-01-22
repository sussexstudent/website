import React from 'react';
import { getGrade, Icon } from '../TrophyCabinet/utils';
import { Award } from '../TrophyCabinet/Award';
import { AwardsPeriodFragment } from '../../generated/graphql';

export const PeriodList = ({ data }: { data: AwardsPeriodFragment[] }) => (
  <ul className="List List--reset">
    {data.map((awardPeriod) => (
      <li key={awardPeriod.id}>
        <h3>
          {awardPeriod.authority.name} - {awardPeriod.displayName}
        </h3>
        <ul className="TrophyCabinet__awards List--reset">
          {awardPeriod.awarded.map((awarded) => (
            <li key={awarded.id}>
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
