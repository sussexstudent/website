import React from 'react';
import ReactDOM from 'react-dom';
import CalenderListView from '../../components/CalenderListView';
import getEventDataFromDocument from './parse';

function getPlainMonth(days) {
  let indexFirst = null;
  let indexLast = null;

  days.forEach((day, index) => {
    if (day.date === 1 && indexFirst === null) {
      indexFirst = index;
      return;
    }

    if (day.date === 1 && indexFirst !== null && indexLast === null) {
      indexLast = index - 1;
    }
  });

  return days.slice(indexFirst, indexLast + 1);
}

function EventsApp(props) {
  return (
    <div>
      <CalenderListView days={getPlainMonth(props.events)} />
    </div>
  );
}

EventsApp.propTypes = {
  events: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
};

const eventData = getEventDataFromDocument(document);
console.log(eventData);
ReactDOM.render(<EventsApp events={eventData} />, document.getElementById('eventsRoot'));
