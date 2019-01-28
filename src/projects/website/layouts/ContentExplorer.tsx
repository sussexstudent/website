import React from 'react';
import qs from 'query-string';
import { ContentPage } from '~website/containers/content/ContentPage';
import HydroLeaf from '~components/HydroLeaf';
import { bind } from 'bind-decorator';

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
    if (Object.hasOwnProperty.call(query, 'path')) {
      const path =
        (Array.isArray(query.path) ? query.path[0] : query.path) || '';
      this.setState({
        path,
        pathInput: path,
      });
    }
  }

  @bind
  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    this.setState((state) => ({
      path: state.pathInput,
    }));
  }

  @bind
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
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="path to render"
              value={pathInput}
              onChange={this.handleInput}
            />
            <input type="submit" value="Render" />
          </form>
          <hr />
        </div>

        {path ? <ContentPage path={path} /> : <h2>No path set</h2>}
      </div>
    );
  }
}

export default HydroLeaf()(ContentExplorer);
