import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ALL_VENUES_QUERY from './AllVenues.graphql';
import FalmerDataList, {
  Cell,
  Row,
  HeaderCell,
} from '../../../components/FalmerDataList/index';
import FalmerSidebar from '../../../components/FalmerSidebar';
import FalmerSubSections, {
  SubSection,
} from '../../../components/FalmerSubSections';
import FalmerListView from '../../../components/FalmerListView';
import { Connection } from '@ussu/common/src/types/falmer';
import { Venue } from '@ussu/common/src/types/events';
import { useQuery } from '@apollo/react-hooks';

interface Result {
  allVenues: Connection<Venue>;
}

const FalmerVenuesList: React.FC = () => {
  const { data, loading } = useQuery<Result>(ALL_VENUES_QUERY);
  if (loading || !data) {
    return null;
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
            <SubSection to="/events/periods/">Branding Periods</SubSection>
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
                  <Link to={`/events/venues/${item.venueId}`}>{item.name}</Link>
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
};

export default FalmerVenuesList;
