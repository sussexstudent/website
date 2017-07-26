import React from 'react';
import PropTypes from 'prop-types';
import BackBar from '@ussu/components/BackBar';
import ContentAPIComposer from '@ussu/components/ContentAPIComposer';
import EventsContainer from '@ussu/components/EventsCalender';

class WhatsOn extends React.Component {
  render() {
    return (
      <div>
        <div className="PageHeader">
          <h1 className="PageHeader__title">What's on</h1>
          <div className="PageHeader__treats">
            <a className="Button" href="/hold-an-event">
              Hold your own event
            </a>
          </div>
        </div>

        <EventsContainer />
      </div>
    );
  }
}

export default WhatsOn;
