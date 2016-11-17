import React from 'react';
import cx from 'classnames';
import 'highlight.js/styles/github-gist.css';
import Highlight from 'react-highlight';
import PlaygroundState from './State';

import './Playground.css';

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
    const { currentIndex } = this.state;
    return (
      <div className="Playground">
        <ul className="Playground__tab-list">
          {this.props.children.map((state, index) => (
            <li
              className={cx('Playground__tab', { 'Playground__tab--active': index === currentIndex })}
              key={state.props.name}
            >
              <a
                className={cx('Playground__tab-link')}
                tabIndex="0"
                onClick={this.handleSelectState.bind(this, index)}
              >
                {state.props.name}
              </a>
            </li>
          ))}
        </ul>
        {/* eslint-disable react/no-danger */}
        <div className="Playground__canvas" dangerouslySetInnerHTML={{ __html: markup }} />
        <Highlight className="html Playground__code">{markup.trim()}</Highlight>
      </div>
    );
  }
}

Playground.propTypes = {
  children: React.PropTypes.node,
};

export default Playground;

export { PlaygroundState };
