import React from 'react';
import { store } from '../redux/store';
import { StoreContext } from 'redux-react-hook';

const CompProvider: React.FC = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default CompProvider;
