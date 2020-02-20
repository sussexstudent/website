import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Container} from '../../../components/Container';
import {KBRootPageProps} from '@ussu/website/src/pages/content/pages/KBRootPage';
import {useNavigation} from '@react-navigation/native';
import {SvgUri} from 'react-native-svg';

export const KBRoot: React.FC<KBRootPageProps> = ({page}) => {
  const navigation = useNavigation();
  return (
    <View>
      <Container top>
        <Text>{page.introduction}</Text>
        <View style={{flexWrap: 'wrap', flex: 1}}>
          {page.categories.map(cat => (
            <View
              style={{
                flex: 1,
                width: '100%',
                flexDirection: 'row',
                flexShrink: 1,
                marginBottom: 16,
              }}
              key={cat.path}>
              <TouchableOpacity
                style={{flexDirection: 'row', flexShrink: 1}}
                onPress={() =>
                  navigation.push('KnowledgeBasePage', {path: cat.path})
                }>
                <View style={{width: 48, height: 48, marginRight: 16}}>
                  <SvgUri width="100%" height="100%" uri={cat.pageIcon.url} />
                </View>
                <Text style={{fontWeight: '700', fontSize: 22, flexShrink: 1}}>
                  {cat.title}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </Container>
    </View>
  );
};
