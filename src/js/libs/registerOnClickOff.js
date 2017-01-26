import hasParent from './dom/hasParent';

export default function registerOnClickOff(el, cb) {
  const listener = (e) => {
    if (hasParent(e.target, el) === false) {
      if (cb() !== false) {
        document.removeEventListener('click', listener);
      }
    }
  };

  document.addEventListener('click', listener);
}
