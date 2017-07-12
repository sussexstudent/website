import has from 'lodash/has';
import get from 'lodash/get';

function getAdminItems() {
  const admin = document.querySelector('#msl_admin');

  if (admin === null) {
    return null;
  }

  const adminItems = [...admin.querySelectorAll('#ulAdmin li a')].map(item => ({
    name: item.innerText,
    link: item.href,
  }));

  const orgItems = [...admin.querySelectorAll('#ulOrgs li a')].map(item => ({
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

  const items = [...page.querySelectorAll('li a')].map(item => ({
    name: item.innerText,
    link: item.href,
  }));

  return {
    items,
  };
}

function auth() {
  const hasDetails = has(window, 'mslUserInfo');
  const details = {
    cardNumber: get(window, 'mslUserInfo.userinfo.IdCardNumber', ''),
    firstName: get(window, 'mslUserInfo.userinfo.FirstName', ''),
    lastName: get(window, 'mslUserInfo.userinfo.LastName', ''),
    uuid: has(window, 'mslUserInfo.userinfo.UniqueId'),
  };

  return {
    isLoggedIn: hasDetails,
    details,
    admin: getAdminItems(),
    page: getPageItems(),
  };
}

function det() {
  if (localStorage.getItem('blocking') != null) {
    try {
      window.blocking = JSON.parse(localStorage.getItem('blocking')).enabled;
    } catch (e) {
      window.blocking = false;
    }
  } else {
    fetch('https://du9l8eemj97rm.cloudfront.net/showads.js')
      .then(() => {
        localStorage.setItem('blocking', JSON.stringify({ enabled: false }));
        window.blocking = false;
      })
      .catch(() => {
        localStorage.setItem('blocking', JSON.stringify({ enabled: true }));
        window.blocking = true;
      });
  }
}

function fundraising() {
  return {
    blocking: det(),
  };
}

export default (function currentUser() {
  if (typeof window === 'undefined') {
    return null;
  }

  return {
    auth: auth(),
    fundraising: fundraising(),
  };
})();
