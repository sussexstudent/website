import React, {useCallback} from 'react';
import LikeEvent from '../../../website/src/pages/whatson/WhatsOnListings/LikeEvent.graphql';
import {useMutation} from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity, View} from 'react-native';
import {useViewer} from '@ussu/website/src/pages/bookmarket/currentUserData';
import {EventCardFragment} from '@ussu/website/src/generated/graphql';

export const EventLikeButton: React.FC<{event: EventCardFragment}> = ({
  event,
}) => {
  const {loading, isAuthenticated} = useViewer();
  const [likeEvent] = useMutation(LikeEvent);

  const handleLike = useCallback(() => {
    likeEvent({
      variables: {
        eventId: event.eventId,
        type:
          event.userLike === null || event.userLike.source === 'UNLIKED'
            ? 'USER'
            : 'UNLIKED',
      },
    });
  }, [likeEvent, event.eventId, event.userLike]);

  const isLiked = event.userLike && event.userLike.source === 'USER';

  if (loading) {
    return null;
  }

  return (
    <TouchableOpacity onPress={handleLike}>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          borderRadius: 15,
          width: 30,
          height: 30,
          paddingLeft: 4,
          paddingTop: 3
        }}>
        {isLiked ? (
          <Icon size={26} name="ios-heart" color="#ff005d" />
        ) : (
          <Icon size={26} name="ios-heart-empty" color="#fff" />
        )}
      </View>
    </TouchableOpacity>
  );
};
