import { MSLTicket } from '@ussu/common/src/types/events';

export function parseTickets(): (undefined | MSLTicket)[] {
  const MSL_TICKET_STRING_REGEX = /^(.)([0-9]+)\.([0-9]+) \((...+)\)$/;

  return Array.from(
    document.querySelectorAll('.event_tickets .event_ticket'),
  ).map((eventTicketEl) => {
    const ticketStringSpan = eventTicketEl.querySelector('span');
    const ticketString = ticketStringSpan ? ticketStringSpan.textContent : '';
    const lastSelectOption = eventTicketEl.querySelector(
      'select option:last-child',
    );
    const hiddenEl = eventTicketEl.querySelector('input[type=hidden]');
    const selectEl = eventTicketEl.querySelector('select');
    const buttonEl = eventTicketEl.querySelector('input[type=submit]');

    if (
      ticketString === null ||
      lastSelectOption === null ||
      hiddenEl === null ||
      selectEl === null ||
      buttonEl === null
    ) {
      return;
    }

    const ticketMatch = ticketString.trim().match(MSL_TICKET_STRING_REGEX);

    if (ticketMatch) {
      const [, currencySymbol, main, fractional, ticketName] = ticketMatch;

      return {
        currencySymbol,
        ticketName,
        maxQuantity: parseInt(
          (lastSelectOption as HTMLOptionElement).value,
          10,
        ),
        value: parseInt(main, 10) + parseInt(fractional, 10) / 100,
        msl: {
          hidden: (hiddenEl as HTMLInputElement).name,
          select: selectEl.name,
          button: (buttonEl as HTMLInputElement).name,
        },
      };
    }

    return;
  });
}
