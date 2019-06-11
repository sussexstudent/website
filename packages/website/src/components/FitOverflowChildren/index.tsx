import React from 'react';
import { forEach, debounce, reduce } from 'lodash';
import { bind } from 'bind-decorator';

interface IProps {
  children: any;
  area: string;
  minItems: number;
}

interface IState {
  visibleToIndex: number;
  needsHeight: boolean;
}

/*
  refactor me!
  this is all quite horrible
*/
class FitOverflowChildren extends React.Component<IProps, IState> {
  private items: any[] = [];
  private container: any;
  static defaultProps = {
    area: '',
  };

  state = {
    visibleToIndex: 0,
    needsHeight: false,
  };

  registerItem(element: HTMLElement, index: number) {
    if (element == null) {
      return;
    }

    this.items[index] = element;
  }

  UNSAFE_componentWillMount() {
    if (Object.hasOwnProperty.call(window, 'emitter')) {
      (window as any).emitter.on('imageLoaded', (data: { area: string }) => {
        if (data.area === this.props.area) {
          this.updateSize();
        }
      });
    }
  }

  componentDidMount() {
    this.updateSize();
    window.addEventListener('resize', debounce(this.updateSize, 100));
  }

  getItems() {
    const items = this.items;

    let count = 0;
    let currentHeight = 0;
    const containerHeight = this.container.getBoundingClientRect().height;
    forEach(items, (element) => {
      const elementHeight = element.getBoundingClientRect().height + 10;
      if (currentHeight + elementHeight > containerHeight) {
        return false;
      }
      currentHeight += elementHeight;
      count += 1;

      return true;
    });

    return count;
  }

  @bind
  updateSize() {
    if (!this.container) {
      return;
    }

    if (this.state.needsHeight) {
      this.setState({ needsHeight: false }, () => this.updateSize());
    } else {
      const count = this.getItems();
      const needsHeight = count < this.props.minItems;

      this.setState({
        needsHeight,
        visibleToIndex: needsHeight ? this.props.minItems : count,
      });
    }
  }

  @bind
  handleContainerRef(ref: any) {
    this.container = ref;
  }

  render() {
    const { children } = this.props;
    const { visibleToIndex, needsHeight } = this.state;

    const fixedHeight = reduce(
      this.items.slice(0, this.props.minItems),
      (sum, el) => sum + el.getBoundingClientRect().height + 10,
      0,
    );
    return (
      <div
        style={{
          overflow: 'hidden',
          [needsHeight ? 'height' : 'flex']: needsHeight
            ? `${fixedHeight}px`
            : '1 1 0',
        }}
        ref={this.handleContainerRef}
      >
        {children.map((child: any, index: number) => (
          <div
            key={index}
            style={{
              visibility: index < visibleToIndex ? 'visible' : 'hidden',
            }}
            ref={(ref: HTMLElement | null) => {
              if (ref) {
                this.registerItem(ref, index);
              }
            }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }
}

export default FitOverflowChildren;
