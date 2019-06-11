import React from 'react';
import Helmet from 'react-helmet';

export const FourOhFourPage = () => (
  <div className="Stonewall Stonewall--small">
    <Helmet title="404" />
    <h1>404 - Page not found</h1>
    <p>Sorry we couldn't find the page you were looking for.</p>
    <p>
      We're always looking to improve our website. If you think there should be
      a page here, or you can't find what you're looking for, please email
      support@sussexstudent.com.
    </p>
  </div>
);
