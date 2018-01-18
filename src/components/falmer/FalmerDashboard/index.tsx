import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import getHours from 'date-fns/getHours';
import {RootState} from "~components/falmer/types";
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

interface IProps {}

function FalmerDashboard({
}: IProps) {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1 className="Heading">{getGreeting()}</h1>

    </div>
  );
}

export default compose<IProps, {}>(
  connect((state: RootState) => ({
    user: state.auth.user,
  })),
  withRouter,
)(FalmerDashboard);
