import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import getHours from 'date-fns/get_hours';

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

function FalmerDashboard() {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1 className="Heading">
        {getGreeting()}
      </h1>
      <em>{`One day we'll put interesting information here!`}</em>
    </div>
  );
}

export default connect(state => ({
  user: state.auth.user,
}))(FalmerDashboard);
