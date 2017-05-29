import has from 'lodash/has';
import get from 'lodash/get';

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
  return {
    auth: auth(),
    fundraising: fundraising(),
  };
})();
