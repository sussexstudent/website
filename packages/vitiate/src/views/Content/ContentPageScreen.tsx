import React from 'react';
import {ViewHeading} from '../../components/ViewHeading';
import {Container} from '../../components/Container';
import {Text, SafeAreaView, ScrollView, View} from 'react-native';
import {GetContentByPathQuery} from '@ussu/website/src/generated/graphql';
import {useQuery} from '@apollo/react-hooks';
import CONTENT_PAGE_QUERY from '../../../../website/src/pages/content/ContentPageQuery.graphql';
import {contentTypeMapNative} from './contentTypeMap';
import {useNavigation} from '@react-navigation/native';

export const ContentPageScreen: React.FC<{route: {params: any}}> = ({
  route,
}) => {
  const navigation = useNavigation();
  const {data, loading} = useQuery<GetContentByPathQuery>(CONTENT_PAGE_QUERY, {
    variables: {
      path: route.params.path,
    },
  });

  if (loading) {
    return <Text>Loading</Text>;
  }

  const page = data?.page;
  if (!page) {
    return <Text>404</Text>;
  }

  const ContentTypeTemplate = contentTypeMapNative.hasOwnProperty(
    page.contentType,
  )
    ? contentTypeMapNative[page.contentType]
    : null;

  if (ContentTypeTemplate) {
    navigation.setOptions({title: page.seoTitle || page.title});
    return (
      <ScrollView>
        <View style={{paddingBottom: 64}}>
          <ContentTypeTemplate page={page} />
        </View>
      </ScrollView>
    );
  }

  return <Text>Error</Text>;

  return (
    <SafeAreaView>
      <Container top>
        <ViewHeading>{data.page.title}</ViewHeading>
      </Container>
    </SafeAreaView>
  );
};
