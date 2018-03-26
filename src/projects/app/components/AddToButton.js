import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../vars';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.brandBlue,
    padding: 8,
    flex: 1,
    flexDirection: 'row',
    shadowColor: '#555',
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 2,
    marginBottom: 6,
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 10,
    opacity: 0.95,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default function AddToButton({ text }) {
  return (
    <View style={styles.button}>
      <Image style={styles.icon} source={require('../img/WhitePlus.png')} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
