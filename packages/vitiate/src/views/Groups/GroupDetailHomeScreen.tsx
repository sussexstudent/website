import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {ViewHeading} from '../../components/ViewHeading';
import {Container} from '../../components/Container';
import {useRoute} from '@react-navigation/native';
import {useQuery} from '@apollo/react-hooks';
import {GetStudentGroupBySlugQuery} from '@ussu/website/src/generated/graphql';
import GetStudentGroup from '../../../../website/src/pages/whatson/WhatsOnListings/WhatsOnGroupHeader.graphql';
import {COLORS} from '@ussu/basil/src/style';

export const GroupDetailHomeScreen: React.FC = () => {
  const {
    params: {groupSlug},
  } = useRoute();
  const {data, loading} = useQuery<GetStudentGroupBySlugQuery>(
    GetStudentGroup,
    {
      variables: {
        slug: groupSlug,
      },
    },
  );

  if (!data?.group || loading) {
    return null;
  }

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: COLORS.GREY_WORST_WINTER,
          height: 180,
        }}></View>
      <Container>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: 84,
              height: 84,
              borderRadius: 84 / 2,
              backgroundColor: COLORS.GREY_WINTER,
              marginTop: -16,
              marginRight: 16,
            }}
          />
          <Text
            style={{paddingTop: 16, fontSize: 28, fontWeight: '700'}}
            adjustsFontSizeToFit={true}>
            {data.group.name}
          </Text>
        </View>
        <Text>{data.group.description}</Text>
      </Container>

      <View style={{}}>
        <Text>Overview</Text>
        <Text>Posts</Text>
        <Text>Events</Text>
        <Text>Discussion</Text>
        <Text>Pages</Text>
      </View>
    </ScrollView>
  );
};
