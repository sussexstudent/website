import Raven from 'raven-js';

export default function logException(ex: Error, context: any) {
  Raven.captureException(ex, {
    extra: context,
  });

  if (window.console && console.error) {
    console.error(ex);
  }
}
