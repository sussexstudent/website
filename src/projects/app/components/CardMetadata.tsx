import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../vars';

const styles = StyleSheet.create({
  text: {
    color: colors.greyWorstDayOfWinter,
    fontSize: 14,
    paddingTop: 4,
  },
});

export const CardMetadata: React.SFC = ({ children }) => {
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};
