import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Button from '../../Button/index';

function FalmerDashboard({ user: { isStaff, hasCmsAccess } }) {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1 className="Heading">Dashboard</h1>
      <h2 className="Heading Heading--highlight">Things you can do:</h2>
      <ul>
        {isStaff
          ? <li>
              <Button href="/admin">Open Admin</Button>
            </li>
          : null}
        {hasCmsAccess
          ? <li>
              <Button href="/cms">Open CMS</Button>
            </li>
          : null}
      </ul>
    </div>
  );
}

export default connect(state => ({
  user: state.auth.user,
}))(FalmerDashboard);
