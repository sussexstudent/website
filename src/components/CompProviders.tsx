import React from 'react';
import { store } from '../projects/website/redux/store';
import { Provider } from 'react-redux';

const CompProvider: React.SFC = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default CompProvider;
