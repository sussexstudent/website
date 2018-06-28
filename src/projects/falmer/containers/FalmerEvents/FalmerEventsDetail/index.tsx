import React from 'react';
import { Mutation, MutationFunc } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { Link, RouteComponentProps } from 'react-router-dom';
import { withState } from 'recompose';
import CopyToClipboardButton from '~components/CopyToClipboardButton';
import ImageTreatmentPreview from '../../../components/ImageTreatmentPreview';
import FalmerSelectEvent from '../../FalmerSelectEvent';

import EVENT_DETAIL_QUERY from './EventDetail.graphql';
import MOVE_EVENT_MUTATION from './MoveEvent.graphql';
import { Event } from '~types/events';
import { HandledQuery } from '~components/HandledQuery';
import { adopt } from '~components/Adopt';
import {Modal} from "~components/Modal";
import {Tag, Tags} from "~components/Tags";
import {formatDistance} from 'date-fns';
import {FalmerDetailHeader} from "~falmer/components/FalmerDetailHeader";

interface RouteParams {
  eventId: number;
}

interface Result {
  data: {
    event: Event;
  };
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
      {({ query, moveEvent }) => {
        const event = query.data.event;
        return (
          <div>
            <Helmet>
              <title>{`${event.title} | Events`}</title>
            </Helmet>
            <div>
              <FalmerDetailHeader
                title={event.title}
                tags={() => (
                  <Tags>
                    {event.mslEvent !== null ? <Tag>MSL linked</Tag> : null}
                    {event.mslEvent ? <Tag>last sync {formatDistance(new Date(), new Date(event.mslEvent.lastSync))} ago</Tag> : null}
                  </Tags>
                )}
                actions={() => (
                  <div>
                    <CopyToClipboardButton
                      value={`https://falmer.sussexstudent.com/o/e/${event.eventId}`}
                    >
                      Copy sharing link
                    </CopyToClipboardButton>
                    <button
                      className="Button"
                      onClick={() => handleMoveModal(true)}
                      disabled={event.children.length > 0}
                    >
                      Move under
                    </button>

                  </div>
                )}
              />
              {event.parent ? (
                <div>
                  Part of{' '}
                  <Link to={`/events/${event.parent.eventId}`}>
                    {event.parent.title}
                  </Link>
                </div>
              ) : null}

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

            <Modal
              isOpen={isMoveModalOpen}
              // onAfterOpen={afterOpenFn}
              onRequestClose={() => handleMoveModal(false)}
              // closeTimeoutMS={n}
              // style={customStyle}
              contentLabel="Modal"
            >
              <h1>Make an child of</h1>
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
            </Modal>
          </div>
        );
      }}
    </Compose>
  );
}

export default withState('isMoveModalOpen', 'handleMoveModal', false)(
  FalmerEventsDetail as any,
);
