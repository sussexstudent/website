export function hasTouch(): boolean {
  return 'ontouchstart' in window ||
    (window.hasOwnProperty &&
      (window.hasOwnProperty('ontouchstart') || navigator.msMaxTouchPoints))
    ? !0
    : 'ontouchstart' in window
    ? !0
    : !1;
}
