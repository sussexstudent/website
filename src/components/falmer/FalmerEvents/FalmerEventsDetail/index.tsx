import React from 'react';
import { graphql, MutationFunc } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { Link, RouteComponentProps } from 'react-router-dom';
import { compose, withState } from 'recompose';
import Loader from '../../../Loader';
import CopyToClipboardButton from '../../../CopyToClipboardButton/index';
import ImageTreatmentPreview from '../../ImageTreatmentPreview';
import FalmerModal from '../../FalmerModal';
import FalmerSelectEvent from '../../FalmerSelectEvent';

import EventDetailQuery from './EventDetail.graphql';
import MoveEventMutation from './MoveEvent.graphql';
import {ApolloHandlerChildProps} from "~components/apolloHandler";
import {Event} from "../../../../types/events";

interface RouteParams {
  eventId: number;
}

interface OwnProps extends RouteComponentProps<RouteParams> {
  isMoveModalOpen: boolean;
  handleMoveModal(bool: boolean): void;
}

interface Result {
  event: Event;
}

type IProps = ApolloHandlerChildProps<OwnProps, Result> & {
  moveEventMutation: MutationFunc<Result>
};

function FalmerEventsDetail({
  data: { loading, event },
  handleMoveModal,
  isMoveModalOpen,
  moveEventMutation,
}: IProps) {
  return (
    <div>
      <Helmet>
        <title>{`${!loading && event.title} | Events`}</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h2 className="Heading Heading--medium">
            {event.title}
            <button
              className="Button"
              onClick={() => handleMoveModal(true)}
              disabled={event.children.length > 0}
            >
              Move under
            </button>
          </h2>
          {event.parent ? (
            <div>
              Part of{' '}
              <Link to={`/events/${event.parent.eventId}`}>
                {event.parent.title}
              </Link>
            </div>
          ) : null}
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

      <FalmerModal
        isOpen={isMoveModalOpen}
        // onAfterOpen={afterOpenFn}
        onRequestClose={() => handleMoveModal(false)}
        // closeTimeoutMS={n}
        // style={customStyle}
        contentLabel="Modal"
      >
        <h1>Move event</h1>
        <FalmerSelectEvent
          onSelect={selectedId => {
            moveEventMutation({
              variables: {
                eventId: event.eventId,
                destinationEventId: selectedId,
              },
            });
            handleMoveModal(false);
          }}
        />
      </FalmerModal>
    </div>
  );
}

export default compose<IProps, OwnProps>(
  withState('isMoveModalOpen', 'handleMoveModal', false),
  graphql(MoveEventMutation, {
    name: 'moveEventMutation',
    options: {
      refetchQueries: ['AllEvents', 'EventDetail'],
    },
  }),
  graphql<Result, OwnProps>(EventDetailQuery, {
    options: props => ({
      variables: {
        eventId: props.match.params.eventId,
      },
    }),
  }),
)(FalmerEventsDetail);
