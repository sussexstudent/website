import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {ViewHeading} from '../../components/ViewHeading';
import {Container} from '../../components/Container';
import {useQuery} from '@apollo/react-hooks';
import getAllStudentGroups from '../../../../website/src/components/StudentGroupsDiscovery/StudentGroupListings.graphql';
import {GetAllStudentGroupsQuery} from '@ussu/website/src/generated/graphql';
import {FalmerImage} from '../../components/FalmerImage';
import {useNavigation} from '@react-navigation/native';

export const GroupsDiscoverScreen: React.FC = () => {
  const navigation = useNavigation();
  const {loading, data} = useQuery<GetAllStudentGroupsQuery>(
    getAllStudentGroups,
  );

  return (
    <SafeAreaView>
      <Container>
        <FlatList
          keyExtractor={item => item.node.groupId.toString()}
          ListHeaderComponent={() => <ViewHeading>Discover Groups</ViewHeading>}
          data={data?.allGroups.edges ?? []}
          renderItem={({item}) => (
            <View style={{marginBottom: 64}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('GroupDetail', {
                    groupSlug: item.node.slug,
                  })
                }>
                <FalmerImage image={item.node.logo} width={300} />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  {item.node.name}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </Container>
    </SafeAreaView>
  );
};
