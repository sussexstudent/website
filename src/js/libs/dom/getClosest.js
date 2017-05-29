function matchesPollyfill(s) {
  const matches = (this.document || this.ownerDocument).querySelectorAll(s);
  let i = matches.length;
  // eslint-disable-next-line
  while (--i >= 0 && matches.item(i) !== this) {
  }
  return i > -1;
}

export default function getClosest(elem, selector) {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      matchesPollyfill;
  }

  // Get closest match
  let el = elem;
  for (; el && el !== document; el = el.parentNode) {
    if (el.matches(selector)) {
      return el;
    }
  }

  return null;
}
