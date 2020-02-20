import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Animated,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import EventDetailQuery from '../../../../website/src/pages/whatson/EventDetailPage/EventsDetailPage.graphql';
import {Container} from '../../components/Container';
import {COLORS} from '@ussu/basil/src/style';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {GetFullEventInfoQuery} from '@ussu/website/src/generated/graphql';
import Icon from 'react-native-vector-icons/Ionicons';
import {HTML} from '../../components/HTML';
import minimalisticTimeRenderer from '@ussu/common/src/libs/minimalisticTimeRenderer';

const styles = StyleSheet.create({
  p: {
    fontSize: 18,
    lineHeight: 22,
  },
  br: {height: 4},
  a: {
    fontWeight: '300',
    color: '#FF3366', // make links coloured pink
  },
});

export const WhatsOnEventDetailScreen: React.FC<{route: {params: any}}> = ({
  route,
}) => {
  const navigation = useNavigation();
  const {data, loading} = useQuery<GetFullEventInfoQuery>(EventDetailQuery, {
    variables: {
      eventId: route.params.eventId,
    },
  });
  const [expandCardAnim] = useState(new Animated.Value(0));

  if (!data || loading) {
    return null;
  }

  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round((dimensions.width * 220) / 320);
  const imageWidth = dimensions.width;
  return (
    <View>
      <Animated.Image
        style={{
          width: imageWidth,
          height: imageHeight,
          position: 'absolute',
          top: 0,
          opacity: expandCardAnim.interpolate({
            inputRange: [0, 0, 60, 60],
            outputRange: [1, 1, 0.6, 0.6],
          }),
        }}
        source={{
          uri: `https://su.imgix.net/${data.event.featuredImage?.resource ??
            'original_images/be978c42d61047d99d2facebda5f515e'}?w=360&h=160&auto=format&q=80&fit=crop&crop=faces`,
        }}
      />
      <SafeAreaView style={{position: 'absolute', top: 0}}>
        <Container>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              padding: 8,
              borderRadius: 32,
              width: 38,
              height: 38,
              justifyContent: 'center',
              flexDirection: 'row',
            }}
            onPress={() => navigation.goBack()}>
            <Icon size={22} color="#fff" name="ios-arrow-back" />
          </TouchableOpacity>
        </Container>
      </SafeAreaView>

      <Animated.ScrollView
        onScroll={Animated.event(
          // scrollX = e.nativeEvent.contentOffset.x
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: expandCardAnim,
                },
              },
            },
          ],
        )}
        snapToAlignment="end">
        <View
          style={{
            marginTop: imageHeight - 16,
            paddingBottom: 32,
            paddingTop: 16,
            borderRadius: 12,
            backgroundColor: COLORS.GREY_BG,
            shadowOpacity: 0.25,
            shadowRadius: 12,
            shadowColor: 'rgba(30, 30, 30)',
          }}>
          <Container>
            <View style={{flexDirection: 'column', marginBottom: 4}}>
              <Text
                style={{
                  color: COLORS.BRAND_RED,
                  fontSize: 16,
                  fontWeight: '700',
                  marginRight: 8,
                }}>
                {minimalisticTimeRenderer(new Date(data.event.startTime))}{' '}
                {format(new Date(data.event.startTime), 'EEE, do LLL, yyyy')}
              </Text>
              {data.event.kicker ? (
                <Text
                  style={{
                    color: COLORS.GREY_SAD_SLATE,
                    fontSize: 16,
                    fontWeight: '700',
                    marginBottom: 4,
                  }}>
                  {data.event.kicker}
                </Text>
              ) : null}
            </View>
            <Text style={{fontSize: 26, fontWeight: '700'}}>
              {data.event.title}
            </Text>
            <View style={{marginBottom: 16}}>
              <Text style={{color: COLORS.GREY_WINTER, fontSize: 16}}>
                {data.event.locationDisplay}
              </Text>
            </View>
            <HTML
              html={
                data.event.bodyHtml !== ''
                  ? data.event.bodyHtml
                  : data.event.shortDescription
              }
            />
          </Container>
        </View>
      </Animated.ScrollView>
    </View>
  );
};
