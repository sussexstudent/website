import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { graphql, gql } from 'react-apollo';
import format from 'date-fns/format';
import Card from '../components/Card';
import CardDescription from '../components/CardDescription';
import CardContent from '../components/CardContent';
import CardImage from '../components/CardImage';
import CardTitle from '../components/CardTitle';
import CardBanner from '../components/CardBanner';
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
          // renderSectionHeader={() => <Text>{}</Text>}
          renderItem={({ item }) => (
            <Card>
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

                  <Text>
                    {`${format(
                      new Date(item.node.startTime),
                      'h:mma'
                    )}-${format(new Date(item.node.endTime), 'h:mma')}`}{' '}
                    / {item.node.locationDisplay}
                  </Text>
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
