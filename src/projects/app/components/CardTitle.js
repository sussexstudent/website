import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../vars';

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default function CardTitle({ children }) {
  return (
    <View>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
}
