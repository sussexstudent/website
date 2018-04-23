import React from 'react';

type RenderFunction = (value: boolean) => any;

interface CommonProps {
  flag: string;
}

interface SeparateProps extends CommonProps {
  enabled: RenderFunction;
  disabled: RenderFunction;
}

type IProps = SeparateProps;

export class FeatureFlag extends React.Component<IProps> {
  render() {
    const isLoading = false;
    const state = false;

    if (isLoading) {
      return null;
    }

    return state ? this.props.enabled(state) : this.props.disabled(state);
  }
}
