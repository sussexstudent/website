import React from 'react';
import { COLORS } from '~libs/style';
import styled from 'react-emotion';

const Root = styled.div({
  position: 'fixed',
  bottom: 0,
  left: 0,
  padding: '0.1rem',
  background: 'rgba(30, 30, 30, 0.8)',
  opacity: 0.6,
  color: COLORS.WHITE,
  textShadow: '1px 0 2px rgba(30, 30, 30, 0.6)',
  '&:hover .content': {
    display: 'block',
    paddingBottom: '1rem',
  },
  '& .content': {
    display: 'none',
  },
});

enum FalmerAPIOptions {
  Production = 'production',
  Local = 'local',
}

interface IState {
  api: FalmerAPIOptions;
}

export default class CompOptionsPanel extends React.Component<{}, IState> {
  state = {
    api: FalmerAPIOptions.Local,
  };

  componentDidMount() {
    const endpoint = localStorage.getItem('falmerEndpoint');
    this.setState({
      api:
        endpoint === 'https://falmer.sussexstudent.com'
          ? FalmerAPIOptions.Production
          : FalmerAPIOptions.Local,
    });
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value as FalmerAPIOptions;
    this.setState({
      api: value,
    });

    if (value === FalmerAPIOptions.Local) {
      localStorage.setItem('falmerEndpoint', 'http://localhost:8000');
    } else {
      localStorage.setItem(
        'falmerEndpoint',
        'https://falmer.sussexstudent.com',
      );
    }

    window.location.reload();
  };

  render() {
    const { api } = this.state;
    return (
      <Root>
        <div className="content">
          <div>
            Falmer API
            <div>
              <label htmlFor="apiFalmer">Production</label>
              <input
                onChange={this.handleChange}
                type="radio"
                name="api"
                value={FalmerAPIOptions.Production}
                checked={api === FalmerAPIOptions.Production}
              />
            </div>
            <div>
              <label htmlFor="apiFalmer">Local</label>
              <input
                onChange={this.handleChange}
                type="radio"
                name="api"
                value={FalmerAPIOptions.Local}
                checked={api === FalmerAPIOptions.Local}
              />
            </div>
          </div>
        </div>
        comp
      </Root>
    );
  }
}
