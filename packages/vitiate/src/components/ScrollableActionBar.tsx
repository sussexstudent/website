import React from 'react';
import {ScrollView, Text, TouchableHighlight, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface ScrollableActionBarProps {
  items: {title: string; screen: string}[];
}

export const ScrollableActionBar: React.FC<ScrollableActionBarProps> = ({
  items,
}) => {
  const navigation = useNavigation();

  return (
    <ScrollView
      horizontal={true}
      style={{paddingLeft: 16, paddingRight: 32}}
      showsHorizontalScrollIndicator={false}>
      {items.map(item => (
        <TouchableHighlight
          key={item.title}
          onPress={() => navigation.navigate(item.screen)}>
          <View
            style={{
              flex: 0,
              backgroundColor: '#999',
              borderRadius: 18,
              paddingHorizontal: 12,
              paddingVertical: 8,
              marginRight: 20,
            }}>
            <Text style={{fontWeight: '600', fontSize: 16, color: '#fff'}}>
              {item.title}
            </Text>
          </View>
        </TouchableHighlight>
      ))}
    </ScrollView>
  );
};
