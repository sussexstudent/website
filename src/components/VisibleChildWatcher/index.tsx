import React from 'react';
import { throttle, orderBy } from 'lodash';

interface IChildWrapperProps {
  handleRef(el: HTMLDivElement): void;
}

class ChildWrapper extends React.Component<IChildWrapperProps> {
  render() {
    const { handleRef } = this.props;
    return <div ref={handleRef}>{this.props.children}</div>;
  }
}

interface IProps {
  onChange(key: string): void;
}

class VisibleChildWatcher extends React.Component<IProps> {
  private childEls: { [key: string]: HTMLElement } = {};

  componentDidMount() {
    window.addEventListener(
      'scroll',
      throttle(() => {
        // const viewportHeight = window.innerHeight;
        const scores = Object.entries(this.childEls).map(([key, el]) => {
          // const rect = el.getBoundingClientRect();
          // console.log({ taken: viewportHeight - rect.top });
          const distance = el.getBoundingClientRect().top;
          const score = distance < 0 ? Math.abs(distance) * 0.8 : distance;

          return [key, score];
        });

        const scoresRanked = orderBy(scores, [(score) => score[1]]);

        this.props.onChange(`${scoresRanked[0][0]}`);
      }, 300),
    );
  }

  render() {
    return (
      <div>
        {React.Children.map(this.props.children, (item) => (
          <ChildWrapper
            handleRef={(el) => {
              this.childEls[(item as any).key] = el;
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
