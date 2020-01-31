import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView, TouchableWithoutFeedback
} from 'react-native';
import {COLORS} from '@ussu/basil/src/style';
import minimalisticTimeRenderer from '@ussu/common/src/libs/minimalisticTimeRenderer';
import {getTagsForEvent} from "@ussu/website/src/pages/whatson/WhatsOnEventCard/tags";

export const WhatsOnEventCard: React.FC<{event: any; onPress: any}> = ({
  event,
  onPress,
}) => {
  const dimensions = Dimensions.get('window');
  const imageHeight = Math.round(((dimensions.width - 32) * 160) / 320);
  const imageWidth = dimensions.width - 32;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{marginBottom: 32}}>
        <Image
          style={{width: imageWidth, height: imageHeight, marginBottom: 12, borderRadius: 6 }}
          source={{
            uri: `https://su.imgix.net/${event.featuredImage?.resource ??
              'original_images/be978c42d61047d99d2facebda5f515e'}?w=360&h=160&auto=format&q=80&fit=crop&crop=faces`,
          }}
        />
        <View>

        <ScrollView horizontal={true} style={{ top: -20, marginTop: -20, paddingHorizontal: 8 }} showsHorizontalScrollIndicator={false}>
          {Array.from(getTagsForEvent(event)).map(item => (
            <View
              onStartShouldSetResponder={() => true}
              style={{
                flex: 0,
                backgroundColor: COLORS.BRAND_RED,
                borderRadius: 12,
                paddingHorizontal: 8,
                paddingVertical: 2,
                marginRight: 8,
              }}
              key={item.id}>
              <Text style={{fontWeight: '600', fontSize: 14, color: '#fff'}}>
                {item.title}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
        <View style={{ flexDirection: 'row',               marginBottom: 4, }}>
          <Text
            style={{
              color: COLORS.BRAND_RED,
              fontSize: 16,
              fontWeight: '700',
              marginRight: 8
            }}>
            {minimalisticTimeRenderer(new Date(event.startTime))}
          </Text>

          <Text
            style={{
              color: COLORS.GREY_SAD_SLATE,
              fontSize: 16,
              fontWeight: '700',
              marginBottom: 4,
            }}>
            {event.kicker}
          </Text>

        </View>
        <Text style={{fontSize: 24, fontWeight: '600'}}>{event.title}</Text>
        <Text style={{color: COLORS.GREY_WINTER, fontSize: 18}}>
          {event.locationDisplay}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
