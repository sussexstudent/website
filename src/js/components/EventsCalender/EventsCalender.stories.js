import React from 'react';
import { storiesOf } from '@storybook/react';
import EventsCalenderItem from './EventsCalenderItem';

storiesOf('EventsCalender', module).add('standard event card', () =>
  <div className="Container">
    <EventsCalenderItem
      part={{
        event: {
          title: 'Introduction to the Role Models Project',
          organisationId: 6013,
          organisationName: null,
          url: '/ents/event/2791/',
          locationDisplay: 'Fulton 104',
          time: '2nd July 6pm - 8pm',
          description:
            'Join us to find out more about volunteering with the Role Models Project! We will be giving an introduction to what the project is all about and what to expect as a new volunteer.',
          startDate: '2017-07-02T18:00:00',
          endDate: '2017-07-02T20:00:00',
          isOverMultipleDays: false,
          featuredImage: {
            resource: 'original_images/67e36f330356451daed64e4011d25616',
          },
        },
      }}
    />
  </div>
);
