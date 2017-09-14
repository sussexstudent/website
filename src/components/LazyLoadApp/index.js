import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';

const LazyLoadApp = ({ children }) => (
  <div>{React.Children.count(children) <= 0 ? <Loader dark /> : children}</div>
);

LazyLoadApp.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LazyLoadApp;
