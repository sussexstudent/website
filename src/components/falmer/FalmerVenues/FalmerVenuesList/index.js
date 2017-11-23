import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';
import AllVenuesQuery from './AllVenues.graphql';
import Loader from '../../../Loader';
import FalmerDataList, {
  Cell,
  Row,
  HeaderCell,
} from '../../FalmerDataList/index';
import FalmerSidebar from '../../FalmerSidebar';
import FalmerSubSections from '../../FalmerSubSections';
import FalmerListView from '../../FalmerListView';

function FalmerVenuesList({ data: { loading, allVenues } }) {
  return (
    <div>
      <Helmet>
        <title>Events</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <FalmerListView>
          <div className="FalmerListView__main">
            <FalmerSubSections>
              <FalmerSubSections.Section to="/events/" back>
                Events
              </FalmerSubSections.Section>
              <FalmerSubSections.Section to="/events/periods/">
                Branding Periods
              </FalmerSubSections.Section>
            </FalmerSubSections>
            <FalmerDataList
              items={allVenues.edges.map(edge => edge.node)}
              header={rowState => (
                <Row {...rowState}>
                  <HeaderCell>Name</HeaderCell>
                </Row>
              )}
              selectable
            >
              {(item, rowState) => (
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
      )}
    </div>
  );
}

export default graphql(AllVenuesQuery)(FalmerVenuesList);
