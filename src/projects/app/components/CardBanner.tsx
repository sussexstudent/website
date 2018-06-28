import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '700',
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 15,
  },
});

interface CardBannerProps {
  color: string;
}

export const CardBanner: React.SFC<CardBannerProps> = ({ color, children }) => {
  return (
    <View style={{ backgroundColor: color }}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};
