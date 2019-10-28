import React from 'react';
import WebView from 'react-native-webview';

export class TodayScreen extends React.Component {
  render() {
    return (
      <WebView
        originWhitelist={['*']}
        source={{
          uri:
            'https://www.sussexstudent.com/sso/login.ashx?idp=SUSSEX_SHIB&ReturnUrl=/app-auth/',
        }}
        onMessage={event => {
          alert(event.nativeEvent.data);
        }}
      />
    );
  }
}
