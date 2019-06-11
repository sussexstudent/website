import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { FalmerImage } from '../../../types/events';
const styles = StyleSheet.create({
  detailItem: {
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
    fontSize: 16,
  },
  detailItemText: {
    fontWeight: '600',
    fontSize: 16,
  },
  detailItemImage: {
    marginRight: 10,
    width: 18,
    height: 18,
  },
});

interface DetailItemProps {
  image: FalmerImage;
}

export const DetailItem: React.FC<DetailItemProps> = ({ image, children }) => {
  return (
    <View style={styles.detailItem}>
      <Image
        style={styles.detailItemImage}
        source={image}
        resizeMode="contain"
      />
      <Text style={styles.detailItemText}>{children}</Text>
    </View>
  );
};
