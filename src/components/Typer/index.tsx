import React from 'react';

enum AnimationState {
  Addition,
  Deletion,
}

enum FrameType {
  CompleteHold,
  EmptyHold,
  Deletion,
  Addition,
}

export const basicTimer = (frameType: FrameType): number => {
  if (frameType === FrameType.CompleteHold) {
    return 1500;
  }

  if (frameType === FrameType.EmptyHold) {
    return 800;
  }

  if (frameType === FrameType.Addition) {
    return 60;
  }

  if (frameType === FrameType.Deletion) {
    return 110;
  }

  return 0;
};

interface TyperRenderProps {
  value: string;
}

interface TyperProps {
  render: (props: TyperRenderProps) => React.ReactElement<TyperRenderProps>;
  lines: string[];
  timer(frameType: FrameType, position: number): number;
}

interface TyperState {
  value: string;
  lineState: AnimationState;
  linePosition: number;
  lineIndex: number;
}

export class Typer extends React.Component<TyperProps, TyperState> {
  private timer?: number;

  constructor(props: TyperProps) {
    super(props);

    this.state = {
      value: props.lines[0],
      lineIndex: 0,
      lineState: AnimationState.Deletion,
      linePosition: props.lines[0].length,
    };

    this.handleFrame = this.handleFrame.bind(this);
    this.queueFrame = this.queueFrame.bind(this);
  }

  componentDidMount() {
    this.timer = window.setTimeout(
      this.handleFrame,
      this.props.timer(FrameType.CompleteHold, 0),
    );
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  handleFrame() {
    const { lines } = this.props;
    const { lineState, linePosition, lineIndex } = this.state;

    if (lineState === AnimationState.Deletion) {
      if (linePosition > 0) {
        this.setState({ linePosition: linePosition - 1 });
        this.queueFrame(FrameType.Deletion);
      } else {
        this.setState({
          linePosition: 0,
          lineState: AnimationState.Addition,
          lineIndex: (lineIndex + 1) % lines.length,
        });
        this.queueFrame(FrameType.EmptyHold);
      }
    } else {
      if (linePosition <= lines[lineIndex].length - 1) {
        this.setState({ linePosition: linePosition + 1 });
        this.queueFrame(FrameType.Addition);
      } else {
        this.setState({ lineState: AnimationState.Deletion });
        this.queueFrame(FrameType.CompleteHold);
      }
    }
  }

  queueFrame(frameType: number) {
    setTimeout(
      this.handleFrame,
      this.props.timer(frameType, this.state.linePosition),
    );
  }

  render() {
    const { linePosition, lineIndex } = this.state;

    return this.props.render({
      value: this.props.lines[lineIndex].slice(0, linePosition),
    });
  }
}
