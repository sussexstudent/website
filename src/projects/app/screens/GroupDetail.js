import React from 'react';
import PixelRatio from 'PixelRatio';
import Dimensions from 'Dimensions';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import format from 'date-fns/format';
import HTMLContentRenderer from '../components/HTMLContentRenderer';
import DetailContent from '../components/DetailContent';

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
      <Image style={styles.detailItemImage} source={image} resizeMode="contain" />
      {children}
    </Text>
  </View>
);

function TabWhatsOn({ data: { group, loading } }) {
  return (
    <View style={styles.tabContent}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <View>
          {group.logo !== null ? (
            <View style={styles.eventImageContainer}>
              <Image
                style={styles.eventImage}
                source={{
                  uri: `https://su.imgix.net/${group.logo
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
              <DetailContent>
                <Text style={styles.title}>{group.name}</Text>
              </DetailContent>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

export default graphql(
  gql`
    query AllEvents($groupId: Int) {
      group(groupId: $groupId) {
        name
        logo {
          resource
        }
        eventSet(last: 5) {
          edges {
            node {
              title
              startTime
              endTime
              featuredImage {
                resource
              }
            }
          }
        }
      }
    }
  `,
  {
    options: props => ({
      variables: {
        groupId: props.groupId,
      },
    }),
  }
)(TabWhatsOn);
