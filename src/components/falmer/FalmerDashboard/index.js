import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';
import getHours from 'date-fns/getHours';
import DashboardQuery from './Dashboard.graphql';
import ContentCard from '../../ContentCard';

function getGreeting() {
  const hour = getHours(new Date());

  if (hour <= 3) {
    return 'Early morning!';
  }
  if (hour <= 10) {
    return 'Morning!';
  }
  if (hour <= 11) {
    return 'Morning (although basically lunch time)!';
  }
  if (hour <= 17) {
    return 'Afternoon!';
  }

  return 'Evening!';
}

function StatsCard({ stat, subtitle }) {
  return (
    <ContentCard>
      <div className="Heading Heading--big">{stat}</div>
      <div>{subtitle}</div>
    </ContentCard>
  );
}

function FalmerDashboard({
  data: { loading, allEvents, allGroups, allImages },
}) {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1 className="Heading">{getGreeting()}</h1>

      {loading ? null : (
        <div
          style={{
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'space-around',
          }}
        >
          <StatsCard stat={allEvents.totalCount} subtitle="Events" />
          <StatsCard stat={allGroups.totalCount} subtitle="Student Groups" />
          <StatsCard stat={allImages.totalCount} subtitle="Images" />
        </div>
      )}
    </div>
  );
}

export default graphql(DashboardQuery)(
  connect(state => ({
    user: state.auth.user,
  }))(FalmerDashboard)
);
