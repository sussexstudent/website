import React from 'react';
import Tree from './Tree';
import './style.css';


class TreeEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      isAdding: false,
      change: null,
    };

    this.onAddComponent = (position) => this.setState({ isAdding: true, position });
    this.handleCloseAdd = () => this.setState({ isAdding: false, position: null });
    this.handleAdd = (componentKey) => {
      this.props.onChange({ ...this.state.change, component: componentKey });
      this.setState({ isAdding: false, change: null });
    };

    this.handleChange = (change) => {
      console.log(change);
      if (change.type === 'INSERT' && !change.component) {
        this.setState({
          isAdding: true,
          change
        })
      } else {
        this.props.onChange(change);
      }
    };
  }

  render() {
    const { components, document } = this.props;
    const { isAdding } = this.state;

    if (isAdding) {
      return (
        <div>
          <button onClick={this.handleCloseAdd}>Cancel</button>
          <ul>
            {Object.keys(components).map(componentKey => {
              const component = components[componentKey];
              return (
                <li onClick={this.handleAdd.bind(this, componentKey)} key={componentKey}>
                  {componentKey}
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    return (
      <div className="TreeEditor">
        <Tree tree={document.toJS()} onChange={this.handleChange} components={components} path={[]} />
      </div>
    );
  }
}
export default TreeEditor;
