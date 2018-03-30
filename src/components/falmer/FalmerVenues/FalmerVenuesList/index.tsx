import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ALL_VENUES_QUERY from './AllVenues.graphql';
import FalmerDataList, {
  Cell,
  Row,
  HeaderCell,
} from '../../FalmerDataList/index';
import FalmerSidebar from '../../FalmerSidebar';
import FalmerSubSections, { SubSection } from '../../FalmerSubSections';
import FalmerListView from '../../FalmerListView';
import { Connection } from '~components/falmer/types';
import { Venue } from '../../../../types/events';
import { HandledQuery } from '~components/HandledQuery';

interface Result {
  allVenues: Connection<Venue>;
}

class AllVenuesQuery extends HandledQuery<Result, {}> {}

function FalmerVenuesList() {
  return (
    <AllVenuesQuery query={ALL_VENUES_QUERY}>
      {({ data }) => {
        if (!data) {
          return;
        }

        const allVenues = data.allVenues;

        return (
          <div>
            <Helmet>
              <title>Events</title>
            </Helmet>

            <FalmerListView>
              <div className="FalmerListView__main">
                <FalmerSubSections>
                  <SubSection to="/events/" back>
                    Events
                  </SubSection>
                  <SubSection to="/events/periods/">
                    Branding Periods
                  </SubSection>
                </FalmerSubSections>
                <FalmerDataList
                  items={allVenues.edges.map((edge) => edge.node)}
                  header={(rowState) => (
                    <Row {...rowState}>
                      <HeaderCell>Name</HeaderCell>
                    </Row>
                  )}
                  selectable
                >
                  {(item: Venue, rowState) => (
                    <Row {...rowState} id={item.venueId}>
                      <Cell>
                        <Link to={`/events/venues/${item.venueId}`}>
                          {item.name}
                        </Link>
                      </Cell>
                    </Row>
                  )}
                </FalmerDataList>
              </div>
              <FalmerSidebar>
                <Link className="Button" to="new">
                  New Venue
                </Link>
              </FalmerSidebar>
            </FalmerListView>
          </div>
        );
      }}
    </AllVenuesQuery>
  );
}

export default FalmerVenuesList;
