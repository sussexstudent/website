import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
} from 'react-native';
import { ApolloProvider } from 'react-apollo';
import ApolloClientForFalmer from './getApolloClientForFalmer';
import TabWhatsOn from './WhatsOn';
import StudentGroupList from './StudentGroupList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fbfbfb',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    margin: 50,
    fontSize: 40,
  },
});

const TabGroups = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabText}>Student Groups</Text>
  </View>
);

const TabFeedback = () => (
  <View style={styles.tabContent}>
    <Text style={styles.tabText}>Feedback</Text>
  </View>
);

export default class app extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedTab: 'tabFavorites' };
  }

  setTab(tabId) {
    this.setState({ selectedTab: tabId });
  }

  render() {
    return (
      <ApolloProvider client={ApolloClientForFalmer}>
        <View style={styles.container}>
          <TabBarIOS>
            <TabBarIOS.Item
              title="What's on"
              icon={require('./img/TabBalloon.png')}
              selected={this.state.selectedTab === 'tabFavorites'}
              onPress={() => this.setTab('tabFavorites')}
            >
              <TabWhatsOn />
            </TabBarIOS.Item>

            <TabBarIOS.Item
              title="Groups"
              selected={this.state.selectedTab === 'tabDownloads'}
              onPress={() => this.setTab('tabDownloads')}
            >
              <StudentGroupList />
            </TabBarIOS.Item>

            <TabBarIOS.Item
              title="Feedback"
              selected={this.state.selectedTab === 'tabMore'}
              onPress={() => this.setTab('tabMore')}
            >
              <TabFeedback />
            </TabBarIOS.Item>
          </TabBarIOS>
        </View>
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('app', () => app);
