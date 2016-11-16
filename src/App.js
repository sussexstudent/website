import React from 'react';
import SidebarMenu from './components/SidebarMenu';
import './App.css';

function App(props) {
  return (
    <div className="App">
      <div className="App__sidebar">
        <SidebarMenu />
      </div>
      <div className="App__content">
        <div className="Content">
          {props.children}
        </div>
      </div>
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
