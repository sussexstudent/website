import React from 'react';
import {Text} from 'react-native';

export const MissingBlock = ({block}) => (
  <Text>Missing block: {JSON.stringify(block)}</Text>
);
