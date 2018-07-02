import React from 'react';
import {Formik} from 'formik';
import {EventForm} from "~falmer/containers/FalmerEvents/EventForm";
import {Event, TicketCost} from "~types/events";
import {inputToDate} from "~falmer/components/FormField/datetime";
import {EventCard} from "~components/EventCard";

interface EventForm {
  title: string;
  startTime_date: string;
  startTime_time: string;
  endTime_date: string;
  endTime_time: string;
  shortDescription: string;
  locationDisplay: string;
  socialFacebook: string;
  kicker: string;
}

const convertFormToEvent = (values: EventForm): Event => {
  const startDate = inputToDate(values.startTime_date, values.startTime_date) || new Date();
  const endDate = inputToDate(values.endTime_date, values.endTime_time) || new Date();

  return {
    startDate,
    endDate,
    id: -1,
    title: values.title,
    startTime: startDate.toISOString(),
    endTime: endDate.toISOString(),
    kicker: values.kicker,
    shortDescription: values.shortDescription,
    venue: null,
    locationDisplay: values.locationDisplay,
    slug: 'new-event',
    eventId: -1,
    featuredImage: null,
    cost: TicketCost.Free,
    ticketLevel: '',
    ticketData: '',
    socialFacebook: values.socialFacebook,
    bundle: null,
    studentGroup: null,
    children: [],
    parent: null,
  };
};

export default function CreateEvent() {
  return (
    <div>
      <h1>Create event</h1>
      <div>
        <Formik
          render={(props) => (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <EventForm {...props} />
              <div>
                <EventCard part={{ event: convertFormToEvent(props.values) }} />
              </div>
            </div>
          )}
          initialValues={{
            title: '',
            kicker: '',
            startTime_date: '',
            startTime_time: '',
            endTime_date: '',
            endTime_time: '',
            shortDescription: '',
            locationDisplay: '',
            socialFacebook: ''
          }}
          onSubmit={e => console.log(e)}
        />
      </div>
    </div>
  );
}
