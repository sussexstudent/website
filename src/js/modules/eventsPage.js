import React from 'react';
import ReactDOM from 'react-dom';
import parseEvents from '../libs/mslEventParser';
import EventsCalender from '../components/EventsCalender';

export default function eventsPage() {
  const events = parseEvents(document.body);

  ReactDOM.render(<EventsCalender events={events} />, document.querySelector('.Legacy .row'));
}
