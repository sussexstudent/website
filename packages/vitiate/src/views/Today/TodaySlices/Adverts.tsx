import React from 'react';
import {View, Text} from 'react-native';
import {COLORS} from '@ussu/basil/src/style';
import {Container} from '../../../components/Container';

export const TodaySliceAdvertProps: React.FC = ({}) => (
  <Container>
    <View
      style={{
        borderRadius: 2,
        backgroundColor: COLORS.GREY_SPRING,
        padding: 8,
      }}>
      <View
        style={{
          borderRadius: 2,
          backgroundColor: COLORS.BRAND_RED,
          alignSelf: 'flex-start',
          padding: 2,
          marginBottom: 2,
        }}>
        <Text style={{color: '#fff', flex: 0, fontWeight: '700', fontSize: 10}}>
          Ad
        </Text>
      </View>
      <Text style={{fontWeight: '500', fontSize: 16, marginBottom: 4}}>
        Be protected with Endsleigh Insurance
      </Text>
      <Text style={{fontWeight: '400', fontSize: 14, marginBottom: 4}}>
        Find flexible, affordable insurance policies designed to meet your needs
      </Text>
      <Text style={{color: COLORS.GREY_WORST_WINTER, fontSize: 12,}}>
        Adverts like this help fund the Students' Union
      </Text>
    </View>
  </Container>
);
