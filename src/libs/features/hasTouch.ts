export function hasTouch() {
  return 'ontouchstart' in window ||
    // @ts-ignore
    ((window as any).DocumentTouch && document instanceof DocumentTouch) ||
    ((window as any).hasOwnProperty &&
      ((window as any).hasOwnProperty('ontouchstart') ||
        // @ts-ignore
        ((window as any).DocumentTouch && document instanceof DocumentTouch) ||
        navigator.msMaxTouchPoints))
    ? !0
    : 'ontouchstart' in window
      ? !0
      : !1;
}
