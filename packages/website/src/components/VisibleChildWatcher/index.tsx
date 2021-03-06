import React from 'react';
import { throttle, orderBy } from 'lodash';

interface ChildWrapperProps {
  handleRef(el: HTMLDivElement): void;
}

class ChildWrapper extends React.Component<ChildWrapperProps> {
  render() {
    const { handleRef } = this.props;
    return <div ref={handleRef}>{this.props.children}</div>;
  }
}

interface VisibleChildWatcherProps {
  onChange(key: string): void;
}

export class VisibleChildWatcher extends React.Component<
  VisibleChildWatcherProps
> {
  private childEls: { [key: string]: HTMLElement } = {};

  componentDidMount() {
    window.addEventListener(
      'scroll',
      throttle(() => {
        // const viewportHeight = window.innerHeight;
        const scores = Object.entries(this.childEls).map(([key, el]) => {
          // const rect = el.getBoundingClientRect();
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
