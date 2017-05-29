import currentUser from '../libs/user';
import classToggle from '../libs/dom/classToggle';
import registerOnClickOff from '../libs/registerOnClickOff';

function updateUsersName() {
  const welcome = document.querySelector('.UserBar__item--welcome');
  if (welcome) {
    welcome.appendChild(
      document.createTextNode(`Hi ${currentUser.auth.details.firstName}!`)
    );
  }
}

function registerDropdowns() {
  [
    ...document.querySelectorAll('.UserBar__item-dropdown'),
  ].forEach(dropdownEl => {
    if (dropdownEl.firstChild) {
      dropdownEl.parentNode.classList.remove('UserBar__item--empty');
    }
  });

  [...document.querySelectorAll('.UserBar__item-admin')].forEach(item => {
    item.querySelector('span').addEventListener('click', () => {
      classToggle(item, 'UserBar__item--open');
      setTimeout(() => {
        registerOnClickOff(
          item.querySelector('.UserBar__item-dropdown'),
          () => {
            classToggle(item, 'UserBar__item--open', false);
          }
        );
      }, 0);
    });
  });
}

export default function onReady() {
  if (currentUser.auth.isLoggedIn) {
    updateUsersName();
    registerDropdowns();
  }
}
