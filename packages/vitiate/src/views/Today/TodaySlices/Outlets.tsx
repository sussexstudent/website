import React from 'react';
import {View, Text} from 'react-native';
import {COLORS} from '@ussu/basil/src/style';
import {Container} from '../../../components/Container';

interface TodaySliceOutletsProps {}

const outlets = [
  [true, 'Falmer Bar'],
  [true, 'Union Shop'],
  [false, 'Northfield Bar'],
];

export const TodaySliceOutletsProps: React.FC<TodaySliceOutletsProps> = ({}) => (
  <View style={{flexDirection: 'column'}}>
    <Container>
      {outlets.map(outlet => (
        <View key={outlet[1]} style={{flexDirection: 'row'}}>
          <View
            style={{
              flex: 0,
              width: 16,
              height: 16,
              borderRadius: 16 / 2,
              marginRight: 8,
              backgroundColor: outlet[0]
                ? COLORS.BRAND_GREEN
                : COLORS.BRAND_RED,
            }}
          />
          <Text style={{fontSize: 16, fontWeight: '600'}}>
            {outlet[1]} {outlet[0] ? 'open' : 'closed'}
          </Text>
        </View>
      ))}
    </Container>
  </View>
);
