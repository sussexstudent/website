import React from 'react';
import {ViewHeading} from '../../components/ViewHeading';
import {Container} from '../../components/Container';
import {SafeAreaView, View, Text, FlatList} from 'react-native';
import getOffers from '../../../../website/src/components/Offers/OffersQuery.graphql';
import {useQuery} from '@apollo/react-hooks';
import {GetOffersQuery} from '@ussu/website/src/generated/graphql';
import {FalmerImage} from '../../components/FalmerImage';
import {COLORS} from '@ussu/basil/src/style';

export const LocalDealsHomeScreen: React.FC = ({navigation}) => {
  const {data, loading} = useQuery<GetOffersQuery>(getOffers);

  return (
    <SafeAreaView>
      <Container top>
        <FlatList
          ListHeaderComponent={() => <ViewHeading>Local deals</ViewHeading>}
          data={data?.allOffers ?? []}
          renderItem={({item: offer}) => (
            <View
              style={{
                marginBottom: 64,
                justifyContent: 'center',
                alignContent: 'center',
                flex: 1,
              }}>
              <FalmerImage image={offer.companyLogo} width={300} />
              <Text
                style={{textAlign: 'center', fontSize: 16, fontWeight: '700'}}>
                {offer.companyName}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: '600',
                  color: COLORS.GREY_WORST_WINTER,
                }}>
                {offer.dealTag}
              </Text>
            </View>
          )}
        />
      </Container>
    </SafeAreaView>
  );
};
