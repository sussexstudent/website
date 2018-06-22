import React from 'react';
import ContentCard from '~components/ContentCard';
import { HandledQuery } from '~components/HandledQuery';
import AllAwardsQuery from './AllAwards.graphql';
import { TrophyModal } from '~components/TrophyCabinet/TrophyModal';
import { Group } from '../../types/awards';
import { isWithinInterval } from 'date-fns';
import { PeriodList } from '~components/TrophyCabinet/PeriodList';

class AwardQuery extends HandledQuery<{ group: Group }, { slug: string }> {}

interface TrophyCabinetState {
  isModalOpen: boolean;
}

export class TrophyCabinet extends React.Component<
  { slug: string },
  TrophyCabinetState
> {
  state = {
    isModalOpen: false,
  };

  render() {
    return (
      <ContentCard>
        <h3>Trophy Cabinet</h3>
        <AwardQuery
          query={AllAwardsQuery}
          variables={{ slug: this.props.slug }}
        >
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
                  onClick={() => this.setState({ isModalOpen: true })}
                  type="button"
                >
                  See all
                </button>
                <TrophyModal
                  isOpen={this.state.isModalOpen}
                  onRequestClose={() => this.setState({ isModalOpen: false })}
                  data={data.group.awards}
                />
              </React.Fragment>
            );
          }}
        </AwardQuery>
      </ContentCard>
    );
  }
}

export default TrophyCabinet;
