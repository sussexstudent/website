import { parseTickets } from '@ussu/common/src/libs/mslEventTicketParser';
import user from '@ussu/common/src/libs/user';

function eventPage() {
  const pathRegEx = /^\/ents\/event\/([0-9]+)\/?/;
  const ticketsEndRegEx = /tickets\/?$/;

  const match = window.location.pathname.match(pathRegEx);

  if (match !== null) {
    if (window.location.pathname.match(ticketsEndRegEx) !== null) {
      return;
    }

    if (window.self !== window.top) {
      window.top.postMessage(
        {
          source: 'ussu-msl-frame-initial-data',
          payload: {
            tickets: parseTickets(),
            pageMenuOptions: user ? user.auth.menu.page : false,
          },
        },
        '*',
      );

      return;
    }
  }
}

export function setup() {
  eventPage();
}
