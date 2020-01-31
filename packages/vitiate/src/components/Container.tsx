import React from 'react';
import {View} from 'react-native';

export const Container: React.FC<{top?: boolean}> = ({children, top}) => (
  <View style={[{paddingLeft: 16, paddingRight: 16}, top && {paddingTop: 16}]}>
    {children}
  </View>
);
