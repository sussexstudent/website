import React from 'react';
import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { graphql, gql } from 'react-apollo';

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
  eventCard: {
    padding: 20,
    marginBottom: 20,
    shadowColor: '#555',
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 2,
    backgroundColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
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
            <View style={styles.eventCard}>
              {item.node.logo !== null ? (
                <Image
                  style={{ width: 200, height: 80 }}
                  source={{
                    uri: `https://su.imgix.net/${item.node.logo
                      .resource}?w=400&h=160`,
                  }}
                />
              ) : null}
              <Text style={styles.title}>{item.node.name}</Text>
              <Text style={styles.description}>{item.node.description}</Text>
            </View>
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
