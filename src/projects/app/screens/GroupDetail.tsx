import React from 'react';
import { StyleSheet, View, Text, PixelRatio, Dimensions } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { HTMLContentRenderer } from '../components/HTMLContentRenderer';
import { DetailContent } from '../components/DetailContent';
import { DetailItem } from '../components/DetailItem';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fbfbfb',
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
    flex: 1,
    alignSelf: 'stretch',
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
  attribContainer: {
    paddingTop: 5,
    marginBottom: 15,
  },
});

function getSize() {
  return {
    width: Dimensions.get('window').width,
  };
}

const GroupDetailScreen: React.FC = ({ data: { group, loading } }) => {
  return (
    <View style={styles.tabContent}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <View style={styles.infoContainer}>
          <HeaderImageScrollView
            style={styles.infoContainer}
            maxHeight={180}
            minHeight={0}
            headerImage={{
              uri: `https://su.imgix.net/${
                group.logo.resource
              }?w=${PixelRatio.getPixelSizeForLayoutSize(
                getSize().width,
              )}&h=${PixelRatio.getPixelSizeForLayoutSize(180)}&fit=crop&q=85`,
            }}
          >
            <View style={styles.infoContainerInner}>
              <DetailContent>
                <Text style={styles.title}>{group.name}</Text>
                <View style={styles.attribContainer}>
                  <DetailItem image={require('../img/EventsCalender.png')}>
                    Social next Thursday, 6pm >
                  </DetailItem>
                </View>
                <HTMLContentRenderer content={'groupDescriptionMarkup'} />
              </DetailContent>
            </View>
          </HeaderImageScrollView>
        </View>
      )}
    </View>
  );
};

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
    options: (props) => ({
      variables: {
        groupId: props.groupId,
      },
    }),
  },
)(GroupDetailScreen);
