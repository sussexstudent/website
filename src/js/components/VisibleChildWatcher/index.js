import React from 'react';
import throttle from 'lodash/throttle';
import orderBy from 'lodash/orderBy';

// eslint-disable-next-line
class ChildWrapper extends React.Component {
  render() {
    const { handleRef } = this.props;
    return (
      <div ref={handleRef}>
        {this.props.children}
      </div>
    );
  }
}

// eslint-disable-next-line
class VisibleChildWatcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentChild: null,
    };

    this.childEls = {};
  }

  componentDidMount() {
    window.addEventListener(
      'scroll',
      throttle(() => {
        const scores = Object.entries(this.childEls).map(([key, el]) => {
          const score = Math.abs(el.getBoundingClientRect().top);

          return [key, score];
        });

        const scoresRanked = orderBy(scores, score => score[1]);

        this.props.onChange(scoresRanked[0][0]);
      }, 300)
    );
  }

  render() {
    return (
      <div>
        {React.Children.map(this.props.children, (item, key) => (
          <ChildWrapper
            handleRef={el => {
              this.childEls[key] = el;
            }}
          >
            {item}
          </ChildWrapper>
        ))}
      </div>
    );
  }
}

export default VisibleChildWatcher;