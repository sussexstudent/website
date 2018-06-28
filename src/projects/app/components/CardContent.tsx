import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardContent: {
    padding: 10,
  },
});

export const CardContent: React.SFC = ({ children }) => {
  return <View style={styles.cardContent}>{children}</View>;
};
