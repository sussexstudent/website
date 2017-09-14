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
  tabText: {
    margin: 50,
    fontSize: 40,
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
  },
});

function TabWhatsOn({ data: { allEvents, loading } }) {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.tabText}>{`What's on`}</Text>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          data={allEvents.edges}
          keyExtractor={item => item.node.id}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              {item.node.featuredImage !== null ? (
                <Image
                  style={{ width: 200, height: 80 }}
                  source={{
                    uri: `https://su.imgix.net/${item.node.featuredImage
                      .resource}?w=400&h=160`,
                  }}
                />
              ) : null}
              <Text>
                {item.node.title} @ {item.node.locationDisplay}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

export default graphql(gql`
  query AllEvents {
    allEvents {
      edges {
        node {
          id
          title
          locationDisplay
          featuredImage {
            resource
          }
        }
      }
    }
  }
`)(TabWhatsOn);
