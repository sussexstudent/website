function classToggle(
  element: HTMLElement | Element,
  className: string,
  force: boolean,
) {
  if (force === undefined) {
    element.classList.toggle(className);
  } else if (force === true) {
    element.classList.add(className);
  } else if (force === false) {
    element.classList.remove(className);
  }
}

export default classToggle;
