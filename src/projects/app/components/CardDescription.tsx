import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../vars';

const styles = StyleSheet.create({
  text: {
    color: colors.greyWinter,
    fontSize: 14,
    marginBottom: 6,
  },
});

export const CardDescription: React.SFC = ({ children }) => {
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};
