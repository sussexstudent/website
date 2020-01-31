import React, {useState} from 'react';
import {
  View,
  Text,
  SectionList
} from 'react-native';
import {COLORS} from '@ussu/basil/src/style';
import {Container} from "./Container";
import {ViewHeading} from "./ViewHeading";
import {ScrollableActionBar} from "./ScrollableActionBar";
import {WhatsOnEventCard} from "./WhatsOnEventCard";
import {useNavigation} from "@react-navigation/native";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import startOfDay from "date-fns/startOfDay";
import addMonths from "date-fns/addMonths";
import {
  getSmartDatePlain,
  hydrateWithDates,
  splitEventsInToParts
} from "@ussu/website/src/pages/whatson/utils";

export const WhatsOnEventList: React.FC<{viewerLiked?: boolean; filters: any, header: any }> = ({
  filters,
  header,
  viewerLiked
}) => {
  const [now] = useState(new Date());
  const navigation = useNavigation();

  const {data} = useQuery(
    gql`
      query getAllEventsWithFilter($filter: EventFilterInput, $viewerLiked: Boolean) {
        allEvents(filter: $filter, viewerLiked: $viewerLiked) {
          edges {
            node {
              id
              eventId
              slug
              title
              startTime
              endTime
              locationDisplay
              kicker
              shortDescription
              url
              cost
              ticketLevel
              ticketType
              canceledAt

              audienceSuitableKidsFamilies
              isOver18Only

              type {
                id
                name
              }

              categories {
                id
                name
              }

              userLike {
                source
              }

              bundle {
                id
                name
              }

              venue {
                id
                name
                websiteLink
              }
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
        viewerLiked: filters.viewerLiked ?? undefined,
        filter: {
          ...filters,
          fromTime: startOfDay(now).toISOString(),
          toTime: addMonths(startOfDay(now), 6).toISOString(),
        },
      },
    },
  );

  if (!data?.allEvents?.edges) {
    return <Text>Loading</Text>
  }

  const sections: string[] = [];
  const eventsInSection: any = {};

  splitEventsInToParts(hydrateWithDates(data?.allEvents?.edges ?? []))
    //.splice(0, 5)
    .forEach(part => {
    const title = getSmartDatePlain(part);

    if (!sections.includes(title)) {
      sections.push(title);
      eventsInSection[title] = [part.event];
    } else {
      eventsInSection[title].push(part.event);
    }
  });

  return (
    <SectionList
      sections={sections.map(title => ({ title, data: eventsInSection[title] }))}
      keyExtractor={(item, index) => item + index}
      ListHeaderComponent={header}
      renderItem={({item}) => (
        <Container>
          <WhatsOnEventCard
            onPress={() =>
              navigation.navigate('EventDetail', {eventId: item.eventId})
            }
            event={item}
          />
        </Container>
      )}
      renderSectionHeader={({section: {title}}) => (
        <View style={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
          <Container>
            <Text
              style={{
                color: COLORS.BRAND_RED,
                paddingVertical: 8,
                fontSize: 22,
                fontWeight: '700',
              }}>
              {title}
            </Text>
          </Container>
        </View>
      )}
    />  );
};
