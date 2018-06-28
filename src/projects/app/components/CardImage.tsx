import React from 'react';
import { View, Image, StyleSheet, PixelRatio, Dimensions } from 'react-native';
import { FalmerImage } from '../../../types/events';

const styles = StyleSheet.create({
  eventImage: {
    width: 200,
    height: 180,
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

interface CardImageProps {
  image: FalmerImage;
}

export const CardImage: React.SFC<CardImageProps> = ({ image }) => {
  return (
    <View style={styles.eventImageContainer}>
      <Image
        style={{
          height: 180,
          width: getSize().width - 40,
        }}
        source={{
          uri: `https://su.imgix.net/${
            image.resource
          }?w=${PixelRatio.getPixelSizeForLayoutSize(
            getSize().width - 40,
          )}&h=${PixelRatio.getPixelSizeForLayoutSize(180)}&fit=crop&q=85`,
        }}
      />
    </View>
  );
};
