import React from 'react';

function CalenderListDay(props) {
  const { date, events } = props.day;

  if (events.length <= 0) {
    return null;
  }

  return (
    <li>
      <h2>{date}</h2>
      <ol>
        {events.map(event => ((
          <li>
            <div>{event.date}</div>
            <div>{event.organsiation}</div>
            <h3>{event.title}</h3>
          </li>
        )))}
      </ol>
    </li>
  );
}

CalenderListDay.propTypes = {
  day: React.PropTypes.shape({
    date: React.PropTypes.string,
    events: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        date: React.PropTypes.string,
        organsiation: React.PropTypes.string,
        title: React.PropTypes.string,
      })),
  }),
};

export default CalenderListDay;
