import React from 'react';
import { Mutation, MutationFunc } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withState } from 'recompose';
import CopyToClipboardButton from '../../../CopyToClipboardButton/index';
import ImageTreatmentPreview from '../../ImageTreatmentPreview';
import FalmerModal from '../../FalmerModal';
import FalmerSelectEvent from '../../FalmerSelectEvent';

import EVENT_DETAIL_QUERY from './EventDetail.graphql';
import MOVE_EVENT_MUTATION from './MoveEvent.graphql';
import { Event } from '../../../../types/events';
import { HandledQuery } from '~components/HandledQuery';
import { adopt } from '~components/Adopt';

interface RouteParams {
  eventId: number;
}

interface Result {
  event: Event;
}

interface RenderProps {
  query: Result;
  moveEvent: {
    mutate: MutationFunc<Result>;
    result: Result;
  };
}

interface Props extends RouteComponentProps<RouteParams> {
  isMoveModalOpen: boolean;
  handleMoveModal(bool: boolean): void;
}

class EventDetailQuery extends HandledQuery<Result, { eventId: number }> {}

const Compose = adopt<RenderProps, Props>({
  query: ({ render, match }) => (
    <EventDetailQuery
      query={EVENT_DETAIL_QUERY}
      variables={{
        eventId: match.params.eventId,
      }}
    >
      {render}
    </EventDetailQuery>
  ),
  moveEvent: ({ render }) => (
    <Mutation
      refetchQueries={['AllEvents', 'EventDetail']}
      mutation={MOVE_EVENT_MUTATION}
    >
      {(mutate, result) => render({ mutate, result })}
    </Mutation>
  ),
});

function FalmerEventsDetail(props: Props) {
  const { handleMoveModal, isMoveModalOpen } = props;
  return (
    <Compose {...props}>
      {({ query: { event }, moveEvent }) => {
        return (
          <div>
            <Helmet>
              <title>{`${event.title} | Events`}</title>
            </Helmet>
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
                    {event.children.map((subEvent) => (
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
                onSelect={(selectedId) => {
                  moveEvent.mutate({
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
      }}
    </Compose>
  );
}

export default withState('isMoveModalOpen', 'handleMoveModal', false)(
  FalmerEventsDetail as any,
);
