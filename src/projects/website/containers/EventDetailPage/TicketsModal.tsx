import React from 'react';
import { Modal } from '~components/Modal';
import { MSLCommunicationEventData } from '~types/events';
import { formatPrice } from '~libs/money';

interface TicketsModalProps {
  msl: null | MSLCommunicationEventData;
}

export const TicketsModal: React.SFC<TicketsModalProps & ReactModal.Props> = (
  props,
) => (
  <Modal size="small" {...props} footerClose>
    <h1>Tickets</h1>

    <ul>
      {props.msl &&
        props.msl.tickets.map((ticket) => (
          <li>
            {ticket.ticketName}{' '}
            {ticket.value <= 0
              ? 'Free'
              : `${ticket.currencySymbol}${formatPrice(ticket.value)}`}
          </li>
        ))}
    </ul>
  </Modal>
);
