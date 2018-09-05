import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export const BrowserRouter: React.SFC = ({ children }) => <Router history={history}>{children}</Router>;
