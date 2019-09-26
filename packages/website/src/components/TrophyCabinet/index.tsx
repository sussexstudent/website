import React, { useState } from 'react';
import { ContentCard } from '../ContentCard';
import AllAwardsQuery from './AllAwards.graphql';
import { TrophyModal } from './TrophyModal';
import { Group } from '@ussu/common/src/types/awards';
import { isWithinInterval } from 'date-fns';
import { PeriodList } from './PeriodList';
import { useQuery } from '@apollo/react-hooks';

interface Result {
  group: Group;
}

interface Props {
  slug: string;
}

const TrophyCabinetContent: React.FC<Result> = ({ group }) => {
  const [isModalOpen, setModal] = useState(false);

  const filtered = group.awards.filter((awardPeriod) =>
    isWithinInterval(new Date(), {
      start: new Date(awardPeriod.startDate),
      end: new Date(awardPeriod.endDate),
    }),
  );

  return (
    <React.Fragment>
      {filtered.length > 0 ? (
        <PeriodList data={filtered} />
      ) : (
        <div className="ContentCard__error-message">
          <span>It looks like there are no awards for the current period!</span>
        </div>
      )}

      <button
        className="Button Button--legacy"
        onClick={() => setModal(true)}
        type="button"
      >
        See all
      </button>
      <TrophyModal
        isOpen={isModalOpen}
        onRequestClose={() => setModal(false)}
        data={group.awards}
      />
    </React.Fragment>
  );
};

export const TrophyCabinet: React.FC<Props> = ({ slug }) => {
  const { data, loading } = useQuery<Result>(AllAwardsQuery, {
    variables: { slug },
  });

  return (
    <ContentCard>
      <h3>Trophy Cabinet</h3>
      {loading || !data || !data.group === null ? null : (
        <TrophyCabinetContent group={data.group} />
      )}
    </ContentCard>
  );
};
