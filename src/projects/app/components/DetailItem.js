import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
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

export default function DetailItem({ image, children }) {
  return (
    <View style={styles.detailItem}>
      <Image style={styles.detailItemImage} source={image} resizeMode="contain" />
      <Text style={styles.detailItemText}>
        {children}
      </Text>
    </View>
  );
}
