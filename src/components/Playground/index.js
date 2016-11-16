import React from 'react';
import PlaygroundState from './State';

class Playground extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
    };
  }

  handleSelectState(currentIndex) {
    this.setState({ currentIndex });
  }

  render() {
    const markup = this.props.children[this.state.currentIndex].props.markup;
    return (
      <div className="Playground">
        <ul>
          {this.props.children.map((state, index) => (
            <li key={state.props.name}>
              <a tabIndex="0" onClick={this.handleSelectState.bind(this, index)}>{state.props.name}</a>
            </li>
          ))}
        </ul>
        {/* eslint-disable react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: markup }} />
        <pre>{markup}</pre>
      </div>
    );
  }
}

Playground.propTypes = {
  children: React.PropTypes.node,
};

export default Playground;

export { PlaygroundState };
