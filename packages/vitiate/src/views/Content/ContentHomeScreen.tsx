import React from 'react';
import {ViewHeading} from '../../components/ViewHeading';
import {Container} from '../../components/Container';
import {SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
export const ContentHomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Container top>
        <ViewHeading>Knowledge base</ViewHeading>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('KnowledgeBasePage', {
              path: '/get-involved/societies-and-student-media/guides/',
            })
          }>
          <Text style={{fontSize: 22, fontWeight: '700'}}>
            Society Handbook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('KnowledgeBasePage', {
              path: '/get-involved/campaigns-toolkit/',
            })
          }>
          <Text style={{fontSize: 22, fontWeight: '700'}}>
            Student Campaigns Toolkit
          </Text>
        </TouchableOpacity>
      </Container>
    </SafeAreaView>
  );
};
