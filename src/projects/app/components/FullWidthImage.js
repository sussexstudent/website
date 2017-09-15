import React from 'react';
import { View, Image, Text } from 'react-native';

export default class FullWidthImage extends React.Component {
  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0,
    };
  }

  _onLayout(event) {
    const containerWidth = event.nativeEvent.layout.width;
    this.setState({
      width: containerWidth,
      height: containerWidth * this.props.height / this.props.width,
    });
  }

  render() {
    return (
      <View onLayout={this._onLayout.bind(this)}>
        <Text>
          {this.state.width}x{this.state.height}
        </Text>
        <Image
          source={this.props.source}
          style={{
            width: this.state.width,
            height: this.state.height,
          }}
        />
      </View>
    );
  }
}
