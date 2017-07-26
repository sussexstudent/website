export default function hasParent(elem, parent) {
  // Get closest match
  let el = elem;
  for (; el && el !== document; el = el.parentNode) {
    if (el === parent) {
      return true;
    }
  }

  return false;
}
