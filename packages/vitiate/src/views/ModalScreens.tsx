import {Button, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../lib/AuthContext';
import {WebView} from 'react-native-webview';
import {COLORS} from '@ussu/basil/src/style';
import Swiper from 'react-native-swiper';
import StudentsUnionLogoNoLogotype from '@ussu/common/src/icons/students-union-logo-no-logotype-red.svg';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container} from '../components/Container';

export function ModalScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 30}}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const styles = {
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: COLORS.BRAND_PRIMARY,
  },
  slideContent: {
    paddingTop: 180,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
};

const Slide: React.FC = ({children}) => (
  <SafeAreaView style={styles.slide}>
    <View style={styles.slideContent}>{children}</View>
  </SafeAreaView>
);

export function SignInScreen({navigation}) {
  const auth = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Swiper
        style={styles.wrapper}
        activeDotColor="#fff"
        loop={false}
        index={0}
        showsButtons={true}
        prevButton={<View />}
        nextButton={<Icon size={28} name="ios-arrow-forward" color="#fff" />}>
        <Slide>
          <StudentsUnionLogoNoLogotype width={128} height={128} />
          <Text style={{fontSize: 30, fontWeight: '800', color: '#fff'}}>
            Sussex Students' Union
          </Text>
        </Slide>
        <Slide>
          <Container>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '800',
                marginBottom: 28,
                color: '#fff',
                textAlign: 'center',
              }}>
              We're your Students' Union
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '600',
                color: '#fff',
                textAlign: 'center',
                marginBottom: 18,
              }}>
              We are a community of over 18,000 students and you're a member of
              that community when you study at Sussex or BSMS.
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '600',
                color: '#fff',
                textAlign: 'center',
                marginBottom: 18,
              }}>
              We're sports team members, Student Reps, campaigners, society
              committee members, event attendees, shoppers and bargain hunters.
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '600',
                color: '#fff',
                textAlign: 'center',
                marginBottom: 18,
              }}>
              We're all of our 18,000 members.
            </Text>
          </Container>
        </Slide>
        <Slide>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '800',
              color: '#fff',
              marginBottom: 48,
            }}>
            Let's get started
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
            <View
              style={{
                backgroundColor: COLORS.BRAND_RED,
                borderRadius: 12,
              }}>
              <Text
                style={{
                  fontWeight: '800',
                  color: '#fff',
                  fontSize: 22,
                  paddingVertical: 18,
                  paddingHorizontal: 32,
                }}>
                Log in
              </Text>
            </View>
          </TouchableOpacity>
        </Slide>
      </Swiper>
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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.BRAND_PRIMARY,
      }}>
      <StudentsUnionLogoNoLogotype width={128} height={128} />
    </View>
  );
};
