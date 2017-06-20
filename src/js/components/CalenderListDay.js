import React from 'react';
import PropTypes from 'prop-types';

function CalenderListDay(props) {
  const { date, events } = props.day;

  if (events.length <= 0) {
    return null;
  }

  return (
    <li>
      <h2>{date}</h2>
      <ol>
        {events.map(event =>
          <li>
            <div>{event.date}</div>
            <div>{event.organsiation}</div>
            <h3>{event.title}</h3>
          </li>
        )}
      </ol>
    </li>
  );
}

CalenderListDay.propTypes = {
  day: PropTypes.shape({
    date: PropTypes.string,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        organsiation: PropTypes.string,
        title: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default CalenderListDay;
