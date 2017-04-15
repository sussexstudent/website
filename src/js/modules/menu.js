function setMenuItemActiveFromPosition(position) {
  const itemLink = document.querySelector(`.AnodyneMenu__item:nth-child(${position}) .AnodyneMenu__link`);
  if (itemLink) {
    itemLink.classList.add('AnodyneMenu__link--active');
  }
}

function pseudoActiveMenu() {
  const pathList = window.location.pathname.slice(1).split('/');
  const firstPath = pathList[0] || '';

  const pathToMenuPosition = {
    'get-involved': 1,
    'whats-on': 2,
    events: 2,
    'about-us': 3,
    support: 4,
  };

  if (Object.hasOwnProperty.call(pathToMenuPosition, firstPath)) {
    setMenuItemActiveFromPosition(pathToMenuPosition[firstPath]);
  }
}

export default function onReady() {
  pseudoActiveMenu();
}
