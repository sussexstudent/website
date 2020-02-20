import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Container} from '../../../components/Container';
import {useNavigation} from '@react-navigation/native';
import {AnswerPageProps} from '@ussu/website/src/pages/content/pages/AnswerPage';
import {ViewHeading} from '../../../components/ViewHeading';
import StreamField from '../StreamField';

export const KBAnswer: React.FC<AnswerPageProps> = ({page}) => {
  const navigation = useNavigation();
  return (
    <View>
      <Container top>
        <ViewHeading>{page.title}</ViewHeading>
        <StreamField items={page.content} page={page} />
        {page.relatedLinks && (
          <View>
            {page.relatedLinks.map(link => (
              <Text>RELATED LINK</Text>
            ))}
          </View>
        )}
      </Container>
    </View>
  );
};
