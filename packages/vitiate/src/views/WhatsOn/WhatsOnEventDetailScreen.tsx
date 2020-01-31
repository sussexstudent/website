import React from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import {useQuery} from "@apollo/react-hooks";
import EventDetailQuery from '../../../../website/src/pages/whatson/EventDetailPage/EventsDetailPage.graphql';
import {Container} from "../../components/Container";
import {COLORS} from "@ussu/basil/src/style";
import {format} from "date-fns";
import HTMLView from 'react-native-htmlview';


const styles = StyleSheet.create({
  p: {
    fontSize: 18,
    lineHeight: 22
  },
  br: { height: 4 },
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
});

export const WhatsOnEventDetailScreen: React.FC<{route: {params: any}}> = ({
  route,
}) => {
  const { data, loading } = useQuery(EventDetailQuery, {
    variables: {
      eventId: route.params.eventId,
    }
  });

  if (!data || loading) {
    return null;
  }

  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(((dimensions.width) * 180) / 320);
  const imageWidth = dimensions.width;

  return (
    <ScrollView>
      <View style={{ paddingBottom: 32 }}>

      <Image
        style={{width: imageWidth, height: imageHeight, marginBottom: 12}}
        source={{
          uri: `https://su.imgix.net/${data.event.featuredImage?.resource ??
          'original_images/be978c42d61047d99d2facebda5f515e'}?w=360&h=160&auto=format&q=80&fit=crop&crop=faces`,
        }}
      />

      <Container>
        <View style={{ flexDirection: 'column',               marginBottom: 4, }}>
          <Text
            style={{
              color: COLORS.BRAND_RED,
              fontSize: 16,
              fontWeight: '700',
              marginRight: 8
            }}>
            {format(new Date(data.event.startTime), 'EEE, do LLL, yyyy')}
          </Text>

          <Text
            style={{
              color: COLORS.GREY_SAD_SLATE,
              fontSize: 16,
              fontWeight: '700',
              marginBottom: 4,
            }}>
            {data.event.kicker}
          </Text>

        </View>
          <Text style={{ fontSize: 32, fontWeight: '700' }}>{data.event.title}</Text>

        <HTMLView
          value={data.event.bodyHtml !== '' ? data.event.bodyHtml : data.event.shortDescription}

          stylesheet={styles}
        />
      </Container>
      </View>

    </ScrollView>
  );
};
