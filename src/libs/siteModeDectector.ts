export enum Mode {
  InternalFrame,
  ExternalFrame,
  Top,
}

export function getSiteMode() {
  if (window.self !== window.top) {
    if (
      window.self.location.host === window.top.location.host &&
      window.top.location.port !== '9001'
    ) {
      return Mode.InternalFrame;
    }

    return Mode.ExternalFrame;
  }

  return Mode.Top;
}
