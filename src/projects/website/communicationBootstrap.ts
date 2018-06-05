import { parseTickets } from '~libs/mslEventTicketParser';
import user from '~libs/user';

function eventPage() {
  const pathRegEx = /^\/ents\/event\/([0-9]+)\/?/;

  const match = window.location.pathname.match(pathRegEx);

  if (match !== null) {
    if (window.location.hash === '#tickets') {
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
