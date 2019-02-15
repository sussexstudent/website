import React from 'react';
import { Helmet } from 'react-helmet';
import getHours from 'date-fns/getHours';

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

export default function FalmerDashboard({  }: IProps) {
  // const mapState = useCallback((state: RootState) => ({
  //   user: state.auth.user,
  // });
  // const { user } = useMappedState(mapState);

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1 className="Heading">{getGreeting()}</h1>
    </div>
  );
}
