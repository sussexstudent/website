import {Button, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../lib/AuthContext';
import {WebView} from 'react-native-webview';

export function ModalScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

export function SignInScreen({navigation}) {
  const auth = useContext(AuthContext);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>Your Union</Text>
      <Text style={{fontSize: 30}}>Let's ge started</Text>
      <Button onPress={() => navigation.navigate('Auth')} title={'Log in'} />
    </View>
  );
}

export function AuthScreen() {
  const auth = useContext(AuthContext);

  return (
    <View style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        source={{
          uri:
            'https://www.sussexstudent.com/sso/login.ashx?idp=SUSSEX_SHIB&ReturnUrl=/app-auth/',
        }}
        onMessage={event => {
          auth.signIn(event.nativeEvent.data);
        }}
      />
    </View>
  );
}

export const SplashLoadingScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>Loading!</Text>
    </View>
  );
};
