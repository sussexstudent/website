import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import Loader from '../../../Loader';
import CopyToClipboardButton from '../../../CopyToClipboardButton/index';
import ImageTreatmentPreview from '../../ImageTreatmentPreview';
import {ApolloHandlerChildProps} from "~components/apolloHandler";
import {Event} from "../../../../types/events";

interface OwnProps {
  handleMoveModal(bool: boolean): void;
}

interface Result {
  event: Event;
}

type IProps = ApolloHandlerChildProps<OwnProps, Result>;

function FalmerEventsCreate({
  data: { loading, event },
  handleMoveModal,
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
            Create new event
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
    </div>
  );
}

export default compose<IProps, OwnProps>()(FalmerEventsCreate);
