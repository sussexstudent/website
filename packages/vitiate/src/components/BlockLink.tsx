import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {COLORS} from '@ussu/basil/src/style';

interface BlockLinkProps {
  to: string;
  external?: boolean;
}

export const BlockLink: React.FC<BlockLinkProps> = ({children}) => (
  <View
    style={{
      flex: 0,
      borderRadius: 6,
      marginVertical: 22,
      padding: 8,
      backgroundColor: COLORS.BRAND_PRIMARY,
      shadowOpacity: 0.2,
      shadowOffset: {height: 3},
      shadowRadius: 3,
      shadowColor: '#333',
    }}>
    <TouchableOpacity style={{flex: 0}}>
      <Text style={{flex: 0, fontSize: 18, fontWeight: '600', color: '#fff'}}>
        {children} >
      </Text>
    </TouchableOpacity>
  </View>
);
