import React from 'react';
import PixelRatio from 'PixelRatio';
import Dimensions from 'Dimensions';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  eventImage: {
    width: 200,
    height: 80,
  },
  eventImageContainer: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    overflow: 'hidden',
  },
});

function getSize() {
  return {
    width: Dimensions.get('window').width,
  };
}

export default function CardImage({ image }) {
  return (
    <View style={styles.eventImageContainer}>
      <Image
        style={styles.eventImage}
        source={{
          uri: `https://su.imgix.net/${image.resource}?w=${PixelRatio.getPixelSizeForLayoutSize(
            getSize().width - 40
          )}&h=${PixelRatio.getPixelSizeForLayoutSize(180)}&fit=crop&q=85`,
        }}
        width={getSize().width - 40}
        height={180}
      />
    </View>
  );
}
