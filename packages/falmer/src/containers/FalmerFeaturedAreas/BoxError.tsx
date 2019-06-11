import React from 'react';

export class BoxError extends React.Component {
  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });
  }

  componentWillReceiveProps(): void {
    this.setState({
      error: null,
      errorInfo: null,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          This box is causing an error; please ensure all fields are filled.
        </div>
      );
    }

    return this.props.children;
  }
}
