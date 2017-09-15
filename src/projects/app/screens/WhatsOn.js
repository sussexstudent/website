import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
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
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  eventCard: {
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
  eventImage: {
    width: 200,
    height: 80,
  },
  eventImageContainer: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    overflow: 'hidden',
  },
});

function TabWhatsOn({ data: { allEvents, loading }, navigator }) {
  return (
    <View style={styles.tabContent}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          data={allEvents.edges}
          keyExtractor={item => item.node.id}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <TouchableOpacity
                onPress={() =>
                  navigator.push({
                    screen: 'ussu.WhatsOn.EventDetail',
                    passProps: {
                      eventId: item.node.eventId,
                    },
                  })}
              >
                {item.node.featuredImage !== null ? (
                  <View style={styles.eventImageContainer}>
                    <Image
                      style={styles.eventImage}
                      source={{
                        uri: `https://su.imgix.net/${item.node.featuredImage
                          .resource}?w=400&h=160`,
                      }}
                    />
                  </View>
                ) : null}
                <Text>
                  {item.node.title} @ {item.node.locationDisplay}
                </Text>
              </TouchableOpacity>
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
          eventId
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
