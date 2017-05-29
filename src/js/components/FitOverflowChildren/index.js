import React from 'react';
import forEach from 'lodash/forEach';
import debounce from 'lodash/debounce';
import reduce from 'lodash/reduce';

/*
  refactor me!
  this is all quite horrible
*/
class FitOverflowChildren extends React.Component {
  constructor(props) {
    super(props);

    this.items = [];
    this.state = {
      visibleToIndex: 0,
      needsHeight: false,
    };
  }

  // eslint-disable-next-line
  registerItem(element, index) {
    if (element == null) {
      return;
    }

    this.items[index] = element;
  }

  componentWillMount() {
    window.emitter.on('imageLoaded', data => {
      if (data.area === this.props.area) {
        this.updateSize();
      }
    });
  }

  componentDidMount() {
    this.updateSize();
    window.addEventListener(
      'resize',
      debounce(this.updateSize.bind(this), 100)
    );
  }

  getItems() {
    const items = this.items;

    let count = 0;
    let currentHeight = 0;
    const containerHeight = this.container.getBoundingClientRect().height;
    forEach(items, element => {
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

  updateSize() {
    if (!this.container) {
      return;
    }
    if (this.state.needsHeight) {
      this.setState({ needsHeight: false }, () => this.updateSize());
    } else {
      const count = this.getItems();
      const needsHeight = count < this.props.minItems;
      console.log({ count, minItems: this.props.minItems });
      this.setState({
        visibleToIndex: needsHeight ? this.props.minItems : count,
        needsHeight,
      });
    }
  }

  handleContainerRef(ref) {
    this.container = ref;
  }

  render() {
    const { children } = this.props;
    const { visibleToIndex, needsHeight } = this.state;

    return (
      <div
        style={{
          overflow: 'hidden',
          [needsHeight ? 'height' : 'flex']: needsHeight
            ? `${reduce(this.items.slice(0, this.props.minItems), (sum, el) => sum + el.getBoundingClientRect().height + 10, 0)}px`
            : '1 1 0',
        }}
        ref={this.handleContainerRef.bind(this)}
      >
        {children.map((child, index) => (
          <div
            key={index}
            style={{
              visibility: index < visibleToIndex ? 'visible' : 'hidden',
            }}
            ref={ref => {
              this.registerItem(ref, index);
            }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }
}

FitOverflowChildren.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.node).isRequired,
  area: React.PropTypes.string,
  minItems: React.PropTypes.number.isRequired,
};

FitOverflowChildren.defaultProps = {
  area: '',
};

export default FitOverflowChildren;
