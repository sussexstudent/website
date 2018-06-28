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
import { CardDescription } from '../components/CardDescription';
import { Card } from '../components/Card';
import { CardContent } from '../components/CardContent';
import { CardTitle } from '../components/CardTitle';
import { CardImageAspect } from '../components/CardImageAspect';

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
  title: {
    fontSize: 20,
  },
  description: {
    color: '#aaa',
    fontSize: 14,
  },
  scrollContainer: {
    paddingTop: 20,
  },
});

function GroupCard({ item, onPress }) {
  return (
    <Card key={item.node.groupId}>
      <TouchableOpacity onPress={onPress}>
        {item.node.logo !== null ? (
          <CardImageAspect image={item.node.logo} />
        ) : null}
        <CardContent>
          <CardTitle>{item.node.name}</CardTitle>
          <CardDescription>{item.node.description}</CardDescription>
        </CardContent>
      </TouchableOpacity>
    </Card>
  );
}

function TabStudentGroup({ data: { allGroups, loading }, navigator }) {
  const exampleSoc = {
    node: {
      groupId: 9999,
      name: 'Example Society',
      description: 'This is an example student group!',
      logo: {
        resource: 'original_images/821022ab923e49a9a281f35c1cb703e9',
        width: 1132,
        height: 560,
      },
    },
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          style={styles.scrollContainer}
          data={allGroups.edges}
          keyExtractor={(item) => item.node.groupId.toString(10)}
          renderItem={({ item, index }) => (
            <GroupCard
              item={index === 27 ? exampleSoc : item}
              onPress={() =>
                navigator.push({
                  screen: 'ussu.Groups.GroupDetail',
                  passProps: {
                    groupId: item.node.groupId,
                  },
                })
              }
            />
          )}
        />
      )}
    </View>
  );
}

export default graphql(gql`
  query AllGroups {
    allGroups {
      edges {
        node {
          groupId
          name
          description
          logo {
            resource
            width
            height
          }
        }
      }
    }
  }
`)(TabStudentGroup);
