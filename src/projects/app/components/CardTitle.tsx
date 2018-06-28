import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
});

export const CardTitle: React.SFC = ({ children }) => {
  return (
    <View>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
};
