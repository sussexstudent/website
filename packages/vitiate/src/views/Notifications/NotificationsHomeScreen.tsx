import React from 'react';
import {ViewHeading} from '../../components/ViewHeading';
import {Container} from '../../components/Container';
import {SafeAreaView, View, Text} from 'react-native';
import {COLORS} from "@ussu/basil/src/style";
import {addDays, formatDistanceToNow} from "date-fns";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const createNotification = (treat: any, title: string, description: string, time: Date) => ({ type: 'BASIC', treat, title, description, time });


const createIconTreat = (name: string, colors: string[]) => {
  return (
    <LinearGradient colors={colors} style={{ marginRight: 16, width: 42, height: 42, alignContent: 'center', justifyContent: 'center', alignItems: 'center', borderRadius: 32, backgroundColor: COLORS.GREY_SUMMER, shadowOffset: {height: 3}, shadowColor: COLORS.BRAND_CORAL, shadowOpacity: 0.3, shadowRadius: 6 }}>
      <Icon size={32} color="#fff" name={name}></Icon>
    </LinearGradient>
  )
}

const notifications = [
  createNotification(createIconTreat('ios-thumbs-up', ['#ff7567', '#ff5989']), "Change things! Nominate yourself or a friend.", "The SU elections are comming. Make big changes with big ideas.", addDays(new Date(), 2), ),
  createNotification(createIconTreat('ios-people', ['#3beaba', '#249cff']), "New member of Comedy Society", "Successfully memembership added for your society.", addDays(new Date(), 2), ),
  createNotification(createIconTreat('ios-timer', ['#ff7500', '#da0010']), "Society Handover due", "You need to handover your society by the 12th of April", addDays(new Date(), 3), ),
  createNotification(createIconTreat('ios-alert', ['#ff7500', '#da0010']), '"GeoSoc Pub Quiz" has been canceled.', "You Saved this event.", addDays(new Date(), 2), ),
  createNotification(createIconTreat('ios-radio', ['#ff7567', '#ff5989']), "UCU announces strikes", "Strike action will start on Thurs 20 Feb and escalate each week, ending in a week-long walkout from Mon 9 to Fri 13 March.", addDays(new Date(), 2), ),
  createNotification(createIconTreat('ios-thumbs-up', ['#ff7567', '#ff5989']), "Change things! Nominate yourself or a friend.", "The SU elections are comming. Make big changes with big ideas.", addDays(new Date(), 2), ),
];

const Notification = ({ notification, unread }) => {
  return (
    <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.GREY_WINTER, paddingVertical: 16, backgroundColor: unread ? '#dae2f6' : 'transparent' }}>
      <Container>
        <View style={{ flexDirection: 'row' }}>
          {notification.treat}
          <View style={{ flexShrink: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 2 }}>{notification.title}</Text>
            <Text style={{ fontSize: 14, fontWeight: '500', color: COLORS.GREY_SAD_SLATE, marginBottom: 4  }}>{notification.description}</Text>
            <Text style={{ fontSize: 12, fontWeight: '400', color: COLORS.GREY_WORST_WINTER }}>{formatDistanceToNow(notification.time)} ago</Text>
          </View>
        </View>
      </Container>
    </View>
  )
}

export const NotificationsHomeScreen: React.FC = ({navigation}) => {
  return (
    <SafeAreaView>
      <Container top>
        <ViewHeading>Notifications</ViewHeading>
      </Container>

      {notifications.map((notif, i) => <Notification notification={notif} unread={i < 3} />)}

    </SafeAreaView>
  );
};
