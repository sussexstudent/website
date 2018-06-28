import React from 'react';
import { View, Image, StyleSheet, PixelRatio, Dimensions } from 'react-native';
import { FalmerImage } from '../../../types/events';

const styles = StyleSheet.create({
  eventImage: {
    width: 200,
    height: 80,
  },
  eventImageContainer: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function getSize() {
  return {
    width: Dimensions.get('window').width,
  };
}

const MAX_HEIGHT = 170;

interface CardImageProps {
  image: FalmerImage;
}

export const CardImageAspect: React.SFC<CardImageProps> = ({ image }) => {
  const displayWidth = getSize().width - 40;
  const displayHeight = displayWidth * (image.height / image.width);

  const imageSize = {
    width: displayWidth,
    height: displayHeight,
  };

  if (displayHeight > MAX_HEIGHT) {
    imageSize.width = MAX_HEIGHT * (image.width / image.height);
    imageSize.height = MAX_HEIGHT;
  }

  return (
    <View style={styles.eventImageContainer}>
      <Image
        style={imageSize}
        source={{
          uri: `https://su.imgix.net/${
            image.resource
          }?w=${PixelRatio.getPixelSizeForLayoutSize(
            getSize().width - 40,
          )}&q=85`,
        }}
      />
    </View>
  );
};
