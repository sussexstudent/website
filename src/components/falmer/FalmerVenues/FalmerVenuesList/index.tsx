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
import FalmerSubSections, { SubSection } from '../../FalmerSubSections';
import FalmerListView from '../../FalmerListView';
import {ApolloHandlerChildProps} from "~components/apolloHandler";
import {Connection} from "~components/falmer/types";
import {Venue} from "../../../../types/events";
import {compose} from 'recompose';

interface OwnProps {

}

interface Result {
  allVenues: Connection<Venue>
}

type IProps = ApolloHandlerChildProps<OwnProps, Result>;

function FalmerVenuesList({ data: { loading, allVenues } }: IProps) {
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
              <SubSection to="/events/" back>
                Events
              </SubSection>
              <SubSection to="/events/periods/">
                Branding Periods
              </SubSection>
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
      )}
    </div>
  );
}

export default compose<IProps, OwnProps>(
  graphql(AllVenuesQuery)
)(FalmerVenuesList);
