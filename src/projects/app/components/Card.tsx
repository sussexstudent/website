import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  eventCard: {
    marginBottom: 20,
    shadowColor: '#555',
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 2,
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
  },
});

export const Card: React.SFC = ({ children }) => {
  return <View style={styles.eventCard}>{children}</View>;
};
