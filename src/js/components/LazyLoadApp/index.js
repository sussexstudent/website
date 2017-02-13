import React from 'react';
import Loader from '../Loader';

const LazyLoadApp = ({ children }) => (
  <div>
    { React.Children.count(children) <= 0 ? <Loader dark /> : children }
  </div>
);

LazyLoadApp.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default LazyLoadApp;
