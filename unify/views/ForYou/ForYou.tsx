import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import gql from 'graphql-tag';

import {useQuery} from '@apollo/react-hooks';
import {useState} from 'react';

function Item({title, id, event}: any) {
  return (
    <TouchableOpacity
      //onPress={() => onSelect(id)}
      style={[styles.item]}>
      {event.featuredImage && (
        <Image
          source={{
            uri: `https://su.imgix.net/${event.featuredImage.resource}?w=320&h=180&auto=format&q=80&fit=crop&crop=faces`,
          }}
          style={{
            width: 382,
            height: 180,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
          }}
        />
      )}

      <View style={styles.itemInner}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export const ForYouScreen = () => {
  const [now] = useState(new Date().toISOString());

  const {data, loading, error} = useQuery(
    gql`
      query AllEvents($fromTime: DateTime) {
        allEvents(filter: {fromTime: $fromTime}) {
          edges {
            node {
              id
              eventId
              title
              locationDisplay
              shortDescription
              startTime
              endTime
              ticketLevel
              ticketType
              bundle {
                name
              }
              venue {
                name
              }
              kicker
              featuredImage {
                resource
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        fromTime: now,
      },
    },
  );

  console.log({loading, error, data, now});

  if (loading || error) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>For you</Text>
      <FlatList
        data={data.allEvents.edges}
        renderItem={({item: {node}}: any) => (
          <Item
            id={node.id}
            title={node.title}
            event={node}
            // selected={!!selected.get(item.id)}
            // onSelect={onSelect}
          />
        )}
        keyExtractor={(item: any) => item.node.id}
        // extraData={selected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#eee',
  },
  item: {
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 6,
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.6,
  },
  itemInner: {
    padding: 20,
  },
  mainTitle: {
    marginVertical: 8,
    marginHorizontal: 16,
    marginTop: 20,
    fontSize: 48,
    fontWeight: '800',
  },
  title: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },
});
