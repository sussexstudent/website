function classToggle(element, className, force) {
  if (force === undefined) {
    element.classList.toggle(className);
  } else if (force === true) {
    element.classList.add(className);
  } else if (force === false) {
    element.classList.remove(className);
  }
}

export default classToggle;
