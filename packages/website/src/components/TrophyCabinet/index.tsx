import React, { useState } from 'react';
import ContentCard from '../ContentCard';
import { HandledQuery } from '../HandledQuery';
import AllAwardsQuery from './AllAwards.graphql';
import { TrophyModal } from './TrophyModal';
import { Group } from '@ussu/common/src/types/awards';
import { isWithinInterval } from 'date-fns';
import { PeriodList } from './PeriodList';

class AwardQuery extends HandledQuery<{ group: Group }, { slug: string }> {}

interface Props {
  slug: string;
}

const TrophyCabinet: React.FC<Props> = ({ slug }) => {
  const [isModalOpen, setModal] = useState(false);

  return (
    <ContentCard>
      <h3>Trophy Cabinet</h3>
      <AwardQuery query={AllAwardsQuery} variables={{ slug }}>
        {({ data }) => {
          if (!data) {
            return null;
          }

          const filtered = data.group.awards.filter((awardPeriod) =>
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
                  <span>
                    It looks like there are no awards for the current period!
                  </span>
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
                data={data.group.awards}
              />
            </React.Fragment>
          );
        }}
      </AwardQuery>
    </ContentCard>
  );
};

export default TrophyCabinet;
