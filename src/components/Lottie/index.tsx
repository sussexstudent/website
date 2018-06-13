import React from 'react';
import lottie from 'lottie-web';

interface LottieProps {
  data: any;
  loop: boolean;
  autoplay: boolean;
  renderer: 'svg' | 'canvas' | 'html';
}

export class Lottie extends React.Component<LottieProps> {
  private containerRef?: HTMLDivElement;

  componentDidMount() {
    lottie.loadAnimation({
      container: this.containerRef,
      renderer: this.props.renderer,
      loop: this.props.loop,
      autoplay: this.props.autoplay,
      animationData: this.props.data,
    });
  }

  render() {
    return (
      <div
        ref={(ref: HTMLDivElement) => (this.containerRef = ref)}
        style={{ width: '100%' }}
      />
    );
  }
}
