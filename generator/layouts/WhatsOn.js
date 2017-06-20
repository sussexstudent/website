import React from 'react';
import PropTypes from 'prop-types';
import BackBar from '@ussu/components/BackBar';
import ContentAPIComposer from '../../src/js/components/ContentAPIComposer/index';
import EventsContainer from '../../src/js/components/EventsCalender/index';

class WhatsOn extends React.Component {
  render() {
    return (
      <div>
        <div className="PageHeader">
          <h1 className="PageHeader__title">What's on</h1>
          <div className="PageHeader__treats">
            <a className="Button" href="/hold-an-event">Hold your own event</a>
          </div>
        </div>

        <EventsContainer />
      </div>
    );
  }
}

export default WhatsOn;
