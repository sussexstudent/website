import React from 'react';
import PixelRatio from 'PixelRatio';
import Dimensions from 'Dimensions';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { graphql, gql } from 'react-apollo';
import format from 'date-fns/format';

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
  eventImage: {},
  eventImageContainer: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    overflow: 'hidden',
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 24,
  },
  location: {
    fontSize: 18,
  },
  infoContainer: {
    paddingTop: 170,
  },
  infoContainerInner: {
    paddingTop: 20,
    backgroundColor: '#fff',
    shadowColor: '#555',
    shadowOpacity: 0.35,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -1 },
  },
});

function getSize() {
  return {
    width: Dimensions.get('window').width,
  };
}
function TabWhatsOn({ data: { event, loading } }) {
  return (
    <View style={styles.tabContent}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <View>
          {event.featuredImage !== null ? (
            <View style={styles.eventImageContainer}>
              <Image
                style={styles.eventImage}
                source={{
                  uri: `https://su.imgix.net/${event.featuredImage
                    .resource}?w=${PixelRatio.getPixelSizeForLayoutSize(
                    getSize().width
                  )}&h=${PixelRatio.getPixelSizeForLayoutSize(
                    180
                  )}&fit=crop&q=85`,
                }}
                width={getSize().width}
                height={180}
              />
            </View>
          ) : null}

          <ScrollView style={styles.infoContainer}>
            <View style={styles.infoContainerInner}>
              <Text style={styles.title}>{event.title}</Text>
              <Text style={styles.location}>{event.locationDisplay}</Text>
              <Text style={styles.time}>
                {format(new Date(event.startTime), 'dddd Do hh:mma')}
              </Text>
              <Text style={styles.description}>{event.shortDescription}</Text>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

export default graphql(
  gql`
    query AllEvents($eventId: Int) {
      event(eventId: $eventId) {
        id
        title
        startTime
        endTime
        locationDisplay
        bodyHtml
        shortDescription
        featuredImage {
          resource
        }
      }
    }
  `,
  {
    options: props => ({
      variables: {
        eventId: props.eventId,
      },
    }),
  }
)(TabWhatsOn);
