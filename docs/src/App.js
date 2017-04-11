import React from 'react';
import SidebarMenu from './components/SidebarMenu';
import './App.css';

function titleChange(nextProps) {
  const title = nextProps.children.type.title;
  document.title = `${title || 'Home'} | USSU Style Guide`;
}

class App extends React.Component {
  componentDidMount() {
    titleChange(this.props);
  }

  componentDidUpdate() {
    titleChange(this.props);
  }

  render() {
    const { children } = this.props;
    return (
      <div className="Site">
        <div className="App">
          <div className="App__sidebar">
            <SidebarMenu />
          </div>
          <div className="App__content">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default App;
