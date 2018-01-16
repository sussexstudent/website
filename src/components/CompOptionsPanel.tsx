import React from 'react';

interface IState {
  mode: 'local' | 'proxy';
}

export default class CompOptionsPanel extends React.Component<{}, IState> {

  render() {
    return (
      <div className="CompOptionsPanel">
        <div className="CompOptionsPanel__content">
        </div>
        comp
      </div>
    );
  }
}
