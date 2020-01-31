import React from 'react';
import {Text} from 'react-native';

interface ViewHeadingProps {}

export const ViewHeading: React.FC<ViewHeadingProps> = ({children}) => (
  <Text style={{fontSize: 42, fontWeight: '800', marginBottom: 16}}>
    {children}
  </Text>
);
