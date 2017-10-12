import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SidebarMenu from './components/SidebarMenu';
import './App.css';
import pages from './pages';
import HomePage from './pages/home';
import EditorPage from './pages/EditorPage';
import FourOhFour from './pages/404';

const dynamicRoutes = () => {
  const routes = [];
  routes.push(<Route path="/" exact component={HomePage} />);
  pages.forEach(section => {
    routes.push(<Route exact path={`/${section.slug}`} key={section.slug} />);
    section.pages.forEach(page => {
      routes.push(
        <Route
          exact
          path={`/${section.slug}/${page.slug}`}
          component={page}
          key={page.slug}
        />
      );
    });
  });

  routes.push(<Route path="/editor" component={EditorPage} />);
  routes.push(<Route path="*" component={FourOhFour} />);

  return routes;
};

function App() {
  return (
    <div className="Site">
      <div className="App">
        <div className="App__sidebar">
          <SidebarMenu />
        </div>
        <div className="App__content">
          <Switch>{dynamicRoutes()}</Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
