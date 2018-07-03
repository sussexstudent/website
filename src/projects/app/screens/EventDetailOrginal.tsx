import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  PixelRatio,
  Dimensions,
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import format from 'date-fns/format';
import { HTMLContentRenderer } from '../components/HTMLContentRenderer';
import { DetailContent } from '../components/DetailContent';
import { colors } from '../vars';

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
    fontWeight: '700',
    marginBottom: 10,
  },
  location: {
    fontSize: 18,
    fontWeight: '700',
  },
  infoContainer: {
    paddingTop: 170,
  },
  attribContainer: {
    marginLeft: -5,
  },
  infoContainerInner: {
    backgroundColor: '#fff',
    shadowColor: '#555',
    shadowOpacity: 0.35,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -1 },
    flex: 1,
    paddingBottom: 170,
  },
  detailItem: {
    marginBottom: 10,
  },
  detailItemText: {
    fontWeight: '500',
    color: colors.greyWinter,
  },
  detailItemImage: {
    marginRight: 10,
    width: 18,
    height: 18,
  },
});

function getSize() {
  return {
    width: Dimensions.get('window').width,
  };
}

const EventDetailItem = ({ image, children }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailItemText}>
      <Image
        style={styles.detailItemImage}
        source={image}
        resizeMode="contain"
      />
      {children}
    </Text>
  </View>
);

const EventDetailOrginalScreen: React.SFC = ({ data: { event, loading } }) => {
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
                  uri: `https://su.imgix.net/${
                    event.featuredImage.resource
                  }?w=${PixelRatio.getPixelSizeForLayoutSize(
                    getSize().width,
                  )}&h=${PixelRatio.getPixelSizeForLayoutSize(
                    180,
                  )}&fit=crop&q=85`,
                }}
                width={getSize().width}
                height={180}
                resizeMode="cover"
              />
            </View>
          ) : null}

          <ScrollView style={styles.infoContainer}>
            <View style={styles.infoContainerInner}>
              <DetailContent>
                <Text style={styles.title}>{event.title}</Text>
                <View style={styles.attribContainer}>
                  <EventDetailItem image={require('../img/EventsCalender.png')}>
                    {format(new Date(event.startTime), 'dddd Do MMMM')}
                  </EventDetailItem>
                  <EventDetailItem image={require('../img/EventsClock.png')}>
                    {`${format(new Date(event.startTime), 'h:mma')}-${format(
                      new Date(event.endTime),
                      'h:mma',
                    )}`}
                  </EventDetailItem>
                  <EventDetailItem image={require('../img/EventsPin.png')}>
                    {event.locationDisplay}
                  </EventDetailItem>
                </View>
                <HTMLContentRenderer content={event.bodyHtml} />
              </DetailContent>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

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
    options: (props) => ({
      variables: {
        eventId: props.eventId,
      },
    }),
  },
)(EventDetailOrginalScreen);
