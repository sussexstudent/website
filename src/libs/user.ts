import { has, get } from 'lodash';

interface MenuItem {
  name: string;
  link: string;
}

function getAdminItems() {
  const admin = document.querySelector('#msl_admin');

  if (admin === null) {
    return null;
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
    admin: adminItems,
    orgs: orgItems,
  };
}

function getPageItems() {
  const page = document.querySelector('#controlpanel');

  if (page === null) {
    return null;
  }

  const items = Array.from(
    page.querySelectorAll<HTMLAnchorElement>('li a'),
  ).map((item) => ({
    name: item.innerText,
    link: item.href,
  }));

  return {
    items,
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
    admin: getAdminItems(),
    page: getPageItems(),
    actionBound: () => {
      if (typeof (window as any).__doPostBack === 'function' && button) {
        // eslint-disable-next-line no-undef
        (window as any).__doPostBack(button.id.replace(/_/gi, '$'), 0);
      }
    },
  };
}

function det() {
  if (localStorage.getItem('blocking') != null) {
    try {
      (window as any).blocking = JSON.parse(
        localStorage.getItem('blocking') || '{"blocking": false}',
      ).enabled;
      return (window as any).blocking;
    } catch (e) {
      (window as any).blocking = false;
      return (window as any).blocking;
    }
  } else {
    fetch('https://du9l8eemj97rm.cloudfront.net/showads.js')
      .then(() => {
        localStorage.setItem('blocking', JSON.stringify({ enabled: false }));
        (window as any).blocking = false;
      })
      .catch(() => {
        localStorage.setItem('blocking', JSON.stringify({ enabled: true }));
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
  admin: null | {
    admin: MenuItem[];
    orgs: MenuItem[];
  };
  page: null | {
    items: MenuItem[];
  };
  actionBound(): void;
}

interface Client {
  fundraising: ClientFundraising;
  auth: ClientAuth;
}

export default (function currentUser(): Client | null {
  if (typeof window === 'undefined') {
    return null;
  }

  return {
    auth: auth(),
    fundraising: fundraising(),
  };
})();
