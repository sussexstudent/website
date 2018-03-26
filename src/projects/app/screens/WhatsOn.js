import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import format from 'date-fns/format';
import Card from '../components/Card';
import CardDescription from '../components/CardDescription';
import CardContent from '../components/CardContent';
import CardImage from '../components/CardImage';
import CardTitle from '../components/CardTitle';
import CardBanner from '../components/CardBanner';
import CardMetadata from '../components/CardMetadata';
import { colors } from '../vars';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fbfbfb',
    alignItems: 'center',
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
  scrollContainer: {
    paddingTop: 20,
  }
});

function TabWhatsOn({ data: { allEvents, loading }, navigator }) {
  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          style={styles.scrollContainer}
          data={allEvents.edges.slice(1)}
          keyExtractor={item => item.node.eventId.toString(10)}
          // renderSectionHeader={() => <Text>{}</Text>}
          renderItem={({ item }) => (
            <Card key={item.node.eventId}>
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
                  <CardImage image={item.node.featuredImage} />
                ) : null}
                {item.node.bundle ? (
                  <CardBanner color="#fbaa05">
                    {item.node.bundle.name}
                  </CardBanner>
                ) : null}
                {item.node.ticketType !== 'NA' &&
                item.node.ticketLevel !== 'SO' ? (
                  <CardBanner color={colors.brandGreen}>
                    {'Buy tickets'}
                  </CardBanner>
                ) : null}
                <CardContent>
                  <CardTitle>{item.node.title}</CardTitle>

                  <CardDescription>
                    {item.node.shortDescription}
                  </CardDescription>

                  <CardMetadata>
                    {`${format(
                      new Date(item.node.startTime),
                      'h:mma'
                    )}-${format(new Date(item.node.endTime), 'h:mma')}`}{' '}
                    / {item.node.locationDisplay}
                  </CardMetadata>
                </CardContent>
              </TouchableOpacity>
            </Card>
          )}
        />
      )}
    </View>
  );
}

export default graphql(
  gql`
    query AllEvents($fromTime: String) {
      allEvents(filter: { fromTime: $fromTime }) {
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
    options: {
      variables: {
        fromTime: new Date(),
      },
    },
  }
)(TabWhatsOn);
