import React from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { graphql, gql } from 'react-apollo';
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

function TabStudentGroup({ data: { allGroups, loading } }) {
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
              {item.node.logo !== null ? (
                <CardImage image={item.node.logo} />
              ) : null}
              <CardContent>
                <CardTitle>{item.node.name}</CardTitle>
                <CardDescription>{item.node.description}</CardDescription>
              </CardContent>
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
          id
          name
          description
          logo {
            resource
          }
        }
      }
    }
  }
`)(TabStudentGroup);
