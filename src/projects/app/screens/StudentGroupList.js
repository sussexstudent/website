import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import CardDescription from '../components/CardDescription';
import Card from '../components/Card';
import CardContent from '../components/CardContent';
import CardTitle from '../components/CardTitle';
import CardImage from '../components/CardImage';

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
  title: {
    fontSize: 20,
  },
  description: {
    color: '#aaa',
    fontSize: 14,
  },
});

function TabStudentGroup({ data: { allGroups, loading }, navigator }) {
  return (
    <View style={styles.tabContent}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          data={allGroups.edges}
          keyExtractor={item => item.node.id}
          renderItem={({ item }) => (
            <Card>
              <TouchableOpacity
                onPress={() =>
                  navigator.push({
                    screen: 'ussu.Groups.GroupDetail',
                    passProps: {
                      groupId: item.node.groupId,
                    },
                  })}
              >
                {item.node.logo !== null ? (
                  <CardImage image={item.node.logo} maintainAspectRatio />
                ) : null}
                <CardContent>
                  <CardTitle>{item.node.name}</CardTitle>
                  <CardDescription>{item.node.description}</CardDescription>
                </CardContent>
              </TouchableOpacity>
            </Card>
          )}
        />
      )}
    </View>
  );
}

export default graphql(gql`
  query AllGroups {
    allGroups {
      edges {
        node {
          groupId
          name
          description
          logo {
            resource
            width
            height
          }
        }
      }
    }
  }
`)(TabStudentGroup);
