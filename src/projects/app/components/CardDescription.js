import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../vars';

const styles = StyleSheet.create({
  text: {
    color: colors.greyWorstDayOfWinter,
    fontSize: 14,
  },
});

export default function CardDescription({ children }) {
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}
