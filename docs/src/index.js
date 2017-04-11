import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import '../../src/css/main.css';
import App from './App';

import pages from './pages';

import HomePage from './pages/home';
import EditorPage from './pages/EditorPage';
import FourOhFour from './pages/404';

import './index.css';


ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        {pages.map(section => (
          <Route path={section.slug} key={section.slug}>
            {section.pages.map(page => (
              <Route path={page.slug} component={page} key={page.slug} />
            ))}
          </Route>
        ))}
        <Route path="/editor" component={EditorPage} />
        <Route path="*" component={FourOhFour} />
      </Route>
    </Router>), document.getElementById('root'));
