import React from 'react';
import PixelRatio from 'PixelRatio';
import Dimensions from 'Dimensions';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import format from 'date-fns/format';
import HTMLContentRenderer from '../components/HTMLContentRenderer';
import DetailContent from '../components/DetailContent';
import DetailItem from '../components/DetailItem';
import AddToButton from '../components/AddToButton';
import { colors } from '../vars';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    flex: 1,
    alignSelf: 'stretch'
  },
  attribContainer: {
    paddingTop: 5,
    marginBottom: 15,
  },
  infoContainerInner: {
    backgroundColor: '#fff',
    shadowColor: '#555',
    shadowOpacity: 0.35,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -1 },
    flex: 1,
  },
});

function getSize() {
  return {
    width: Dimensions.get('window').width,
  };
}

function TabWhatsOn({ data: { event, loading } }) {
  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <View style={styles.infoContainer}>
          <HeaderImageScrollView
            style={styles.infoContainer}
            maxHeight={180}
            minHeight={0}
            headerImage={{
              uri: `https://su.imgix.net/${event.featuredImage
                .resource}?w=${PixelRatio.getPixelSizeForLayoutSize(
                getSize().width
              )}&h=${PixelRatio.getPixelSizeForLayoutSize(
                180
              )}&fit=crop&q=85`,
            }}
          >
            <View style={styles.infoContainerInner}>
              <DetailContent>
                <Text style={styles.title}>{event.title}</Text>
                <View style={styles.attribContainer}>
                  <DetailItem image={require('../img/EventsCalender.png')}>
                    {format(new Date(event.startTime), 'dddd Do MMMM')}
                  </DetailItem>
                  <DetailItem image={require('../img/EventsClock.png')}>
                    {`${format(new Date(event.startTime), 'h:mma')}-${format(
                      new Date(event.endTime),
                      'h:mma'
                    )}`}
                  </DetailItem>
                  <DetailItem image={require('../img/EventsPin.png')}>
                    {event.locationDisplay}
                  </DetailItem>
                  <AddToButton text="Add to My Events" />
                </View>
                <HTMLContentRenderer content={event.bodyHtml} />
              </DetailContent>
            </View>
          </HeaderImageScrollView>
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
