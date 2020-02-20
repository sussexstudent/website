import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Container} from '../../../components/Container';
import {useNavigation} from '@react-navigation/native';
import {KBCategoryPageProps} from '@ussu/website/src/pages/content/pages/KBCategoryPage';
import {SvgUri} from 'react-native-svg';
import {ViewHeading} from '../../../components/ViewHeading';

export const KBCategory: React.FC<KBCategoryPageProps> = ({page}) => {
  const navigation = useNavigation();
  return (
    <View>
      <Container top>
        <ViewHeading>{page.title}</ViewHeading>
        {page.subPagesGeneric.map(page => (
          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              flexShrink: 1,
              marginBottom: 22,
            }}
            key={page.path}>
            <TouchableOpacity
              style={{flexDirection: 'row', flexShrink: 1}}
              onPress={() =>
                navigation.push('KnowledgeBasePage', {path: page.path})
              }>
              <Text style={{fontWeight: '600', fontSize: 22, flexShrink: 1}}>
                {page.title}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </Container>
    </View>
  );
};
