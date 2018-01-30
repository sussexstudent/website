import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

const HydroRoot: React.SFC<{}> = (props) => (
  <BrowserRouter>
    <ScrollToTop>{props.children}</ScrollToTop>
  </BrowserRouter>
);

export default HydroRoot;
