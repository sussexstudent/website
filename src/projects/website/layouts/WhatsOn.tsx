import React from 'react';
import EventsApplication from '~components/EventsApplication';

class WhatsOn extends React.Component {
  render() {
    return (
      <div>
        <div className="PageHeader">
          <h1 className="PageHeader__title">{"What's on"}</h1>
          <div className="PageHeader__treats">
            <a className="Button" href="/hold-an-event">
              Hold your own event
            </a>
          </div>
        </div>

        <EventsApplication />
      </div>
    );
  }
}

export default WhatsOn;
