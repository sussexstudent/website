import React from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';
import getHours from 'date-fns/getHours';
import DashboardQuery from './Dashboard.graphql';
import ContentCard from '../../ContentCard';
import {RootState} from "~components/falmer/types";
import {ApolloHandlerChildProps} from "~components/apolloHandler";
import {compose} from 'recompose';

function getGreeting() {
  const hour = getHours(new Date());

  if (hour <= 3) {
    return 'Early morning!';
  }
  if (hour <= 11) {
    return 'Morning!';
  }
  if (hour <= 17) {
    return 'Afternoon!';
  }

  return 'Evening!';
}

interface IStatsCardProps {
  stat: number | string;
  subtitle: string;
}

function StatsCard({ stat, subtitle }: IStatsCardProps) {
  return (
    <ContentCard>
      <div className="Heading Heading--big">{stat}</div>
      <div>{subtitle}</div>
    </ContentCard>
  );
}

interface OwnProps {}

interface Result {
  allGroups: {
    totalCount: number;
  }
  allEvents: {
    totalCount: number;
  }
  allImages: {
    totalCount: number;
  }
}

type IProps = ApolloHandlerChildProps<OwnProps, Result>

function FalmerDashboard({
  data: { loading, allEvents, allGroups, allImages },
}: IProps) {
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

export default compose<IProps, OwnProps>(
  graphql(DashboardQuery),
  connect((state: RootState) => ({
    user: state.auth.user,
  }))
)(FalmerDashboard);
