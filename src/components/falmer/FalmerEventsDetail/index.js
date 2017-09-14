import React from 'react';
import { graphql } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import EventDetailQuery from './EventDetail.graphql';
import Loader from '../../Loader';
import CopyToClipboardButton from '../../CopyToClipboardButton/index';
import ImageTreatmentPreview from '../ImageTreatmentPreview';

function FalmerEventsDetail({ data: { loading, event } }) {
  return (
    <div>
      <Helmet>
        <title>{`${!loading && event.title} | Events`}</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h2 className="Heading Heading--medium">{event.title}</h2>
          <CopyToClipboardButton
            value={`https://falmer.sussexstudent.com/o/e/${event.eventId}`}
          >
            Copy sharing link
          </CopyToClipboardButton>
          <div>
            <h2 className="Heading Heading--standard">Images</h2>
            {event.featuredImage ? (
              <ImageTreatmentPreview image={event.featuredImage} />
            ) : (
              <em>No image attached to this event</em>
            )}
          </div>
          {event.children.length > 0 ? (
            <div>
              <h2 className="Heading Heading--standard">Sub-events</h2>
              <ul>
                {event.children.map(subEvent => (
                  <li>
                    <Link to={`/events/${subEvent.eventId}`}>
                      {subEvent.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}

      <Modal
        isOpen
        // onAfterOpen={afterOpenFn}
        // onRequestClose={requestCloseFn}
        // closeTimeoutMS={n}
        // style={customStyle}
        contentLabel="Modal"
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            zIndex: 400,
          },
          content: {
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            bottom: '20px',
            border: '1px solid rgb(200, 200, 200)',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
            boxShadow: '0 1px 5px 0 rgba(30, 30, 30, 0.1)',
          },
        }}
      >
        <h1>Move event</h1>
        <p>if event has parent: </p>
      </Modal>
    </div>
  );
}

export default graphql(EventDetailQuery, {
  options: props => ({
    variables: {
      eventId: props.match.params.eventId,
    },
  }),
})(FalmerEventsDetail);
