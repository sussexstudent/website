import mitt from 'mitt';
import { has, get } from 'lodash';

interface MenuItem {
  name: string;
  link: string;
}

function getAdminItems() {
  const admin = document.querySelector('#msl_admin');

  if (admin === null) {
    return { areas: [], orgs: [] };
  }

  const adminItems = Array.from(
    admin.querySelectorAll<HTMLAnchorElement>('#ulAdmin li a'),
  ).map((item) => ({
    name: item.innerText,
    link: item.href,
  }));

  const orgItems = Array.from(
    admin.querySelectorAll<HTMLAnchorElement>('#ulOrgs li a'),
  ).map((item) => ({
    name: item.innerText,
    link: item.href,
  }));

  return {
    areas: adminItems,
    orgs: orgItems,
  };
}

function getPageItems() {
  const page = document.querySelector('#controlpanel');

  if (page === null) {
    return { actions: [] };
  }

  const actions = Array.from(
    page.querySelectorAll<HTMLAnchorElement>('li a'),
  ).map((item) => ({
    name: item.innerText,
    link: item.href,
  }));

  return {
    actions,
  };
}

function auth() {
  const hasDetails = has(window, 'mslUserInfo');
  const profile = {
    cardNumber: get(window, 'mslUserInfo.userinfo.IdCardNumber', ''),
    firstName: get(window, 'mslUserInfo.userinfo.FirstName', ''),
    lastName: get(window, 'mslUserInfo.userinfo.LastName', ''),
    uuid: get(window, 'mslUserInfo.userinfo.UniqueId'),
  };
  const button = document.querySelector('.msl-loginbutton');
  return {
    profile,
    isLoggedIn: hasDetails,
    menu: {
      admin: getAdminItems(),
      page: getPageItems(),
    },
    actionBound: () => {
      if (typeof (window as any).__doPostBack === 'function' && button) {
        setTimeout(
          () => (window as any).__doPostBack(button.id.replace(/_/gi, '$'), 0),
          0,
        );
      }
    },
  };
}

function det() {
  if (window.localStorage.getItem('blocking') != null) {
    try {
      (window as any).blocking = JSON.parse(
        window.localStorage.getItem('blocking') ?? '{"blocking": false}',
      ).enabled;
      return (window as any).blocking;
    } catch (e) {
      (window as any).blocking = false;
      return (window as any).blocking;
    }
  } else {
    fetch('https://du9l8eemj97rm.cloudfront.net/showads.js')
      .then(() => {
        window.localStorage.setItem(
          'blocking',
          JSON.stringify({ enabled: false }),
        );
        (window as any).blocking = false;
      })
      .catch(() => {
        window.localStorage.setItem(
          'blocking',
          JSON.stringify({ enabled: true }),
        );
        (window as any).blocking = true;
      });

    return false;
  }
}

function fundraising() {
  return {
    blocking: det(),
  };
}

interface ClientFundraising {
  blocking: boolean;
}

export interface ClientAuth {
  isLoggedIn: boolean;
  profile: {
    cardNumber: number;
    firstName: string;
    lastName: string;
    uuid: string;
  };
  menu: {
    admin: {
      areas: MenuItem[];
      orgs: MenuItem[];
    };
    page: {
      actions: MenuItem[];
    };
  };
  actionBound(): void;
}

interface Client {
  fundraising: ClientFundraising;
  auth: ClientAuth;
  mitt: mitt.Emitter;
}

function currentUser(): Client | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return {
    auth: auth(),
    fundraising: fundraising(),
    mitt: mitt(),
  };
}

export default currentUser();
