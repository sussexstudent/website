import React from 'react';
import qs from 'query-string';
import {ContentPage} from "~components/content/ContentPage";
import HydroLeaf from "~components/HydroLeaf";

interface IState {
  path: string | null;
  pathInput: string;
}

class ContentExplorer extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      path: null,
      pathInput: '',
    };
  }

  componentDidMount() {
    const query = qs.parse(window.location.search);
    if (Object.hasOwnProperty.call(query,'path')) {
      const path = query.path;
      this.setState({
        path,
        pathInput: path,
      })
    }
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    this.setState((state) => ({
      path: state.pathInput,
    }));
  }

  handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      pathInput: e.currentTarget.value,
    });
  }

  render() {
    const { path, pathInput } = this.state;

    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="path to render" value={pathInput} onChange={this.handleInput.bind(this)} />
            <input type="submit" value="Render" />
          </form>
          <hr />
        </div>

        {path ? <ContentPage path={path} /> : <h2>No path set</h2>}
      </div>
    )
  }
}

export default HydroLeaf()(ContentExplorer);
