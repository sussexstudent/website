import React, {useContext} from 'react';
import {ViewHeading} from '../../components/ViewHeading';
import {Container} from '../../components/Container';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@ussu/basil/src/style';
import {AuthContext} from '../../lib/AuthContext';

const ItemAction: React.FC<{onPress: any}> = ({onPress, children}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderBottomColor: COLORS.GREY_WINTER,
          borderBottomWidth: 1,
          paddingVertical: 16,
        }}>
        <Text style={{fontSize: 18}}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};
const ItemPage: React.FC<{to: string}> = ({to, children}) => {
  const navigation = useNavigation();
  return (
    <ItemAction onPress={() => navigation.navigate(to)}>{children}</ItemAction>
  );
};

export const MoreHomeScreen: React.FC = () => {
  const auth = useContext(AuthContext);
  return (
    <SafeAreaView>
      <Container top>
        <ScrollView>
          <View style={{flex: 1}}>
            <ViewHeading>More</ViewHeading>

            <ItemPage to="LocalDealsHome">Local deals via Totum</ItemPage>
            <ItemPage to="ContentHome">Knowledge base</ItemPage>
            <ItemPage to="URFHome">Listen to URF</ItemPage>
            <ItemAction onPress={() => auth.signOut()}>Sign out</ItemAction>
          </View>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};
