import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, RouteComponentProps } from 'react-router-dom';
import CopyToClipboardButton from '@ussu/website/src/components/CopyToClipboardButton';
import ImageTreatmentPreview from '../../../components/ImageTreatmentPreview';
import FalmerSelectEvent from '../../FalmerSelectEvent';

import EVENT_DETAIL_QUERY from './EventDetail.graphql';
import MOVE_EVENT_MUTATION from './MoveEvent.graphql';
import { Event } from '@ussu/common/src/types/events';
import { Modal } from '@ussu/website/src/components/Modal';
import { Tag, Tags } from '@ussu/website/src/components/Tags';
import { formatDistance } from 'date-fns';
import { FalmerDetailHeader } from '../../../components/FalmerDetailHeader';
import { useQuery, useMutation } from 'react-apollo-hooks';

interface Result {
  event: Event;
}

interface Props extends RouteComponentProps<{ eventId: string | undefined }> {}

const FalmerEventsDetail: React.FC<Props> = ({
  match: {
    params: { eventId },
  },
}) => {
  const { data, loading } = useQuery<Result>(EVENT_DETAIL_QUERY, {
    variables: { eventId },
  });
  const moveEvent = useMutation(MOVE_EVENT_MUTATION, {
    refetchQueries: ['AllEvents', 'EventDetail'],
  });
  const [isMoveModalOpen, handleMoveModal] = useState(false);

  if (loading || !data) {
    return null;
  }

  const event = data.event;
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
              {event.mslEvent ? (
                <Tag>
                  last sync{' '}
                  {formatDistance(
                    new Date(),
                    new Date(event.mslEvent.lastSync),
                  )}{' '}
                  ago
                </Tag>
              ) : null}
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
            moveEvent({
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
};

export default FalmerEventsDetail;
