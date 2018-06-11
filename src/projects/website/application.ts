import Raven from 'raven-js';
import mitt from 'mitt';
import { addClassesForFeatures } from '~libs/features';
addClassesForFeatures();

// import { grooves } from '~libs/grooves';
import '../../modules/eventRedirect';
import { getSiteMode, Mode } from '~libs/siteModeDectector';

// Install raven for sentry error  reporting
if (process.env.NODE_ENV === 'production') {
  Raven.config('https://fd478822b69843a2a3718c621c5fadad@sentry.io/158659', {
    // eslint-disable-next-line
    release: (window as any).releaseMetadata.gitRev || 'dev',
    environment: 'production',
    whitelistUrls: [/sussexstudent\.com/, /du9l8eemj97rm.cloudfront\.net/],
  }).install();
}

// probs not great
(window as any).emitter = new mitt();

(window as any).LinkshimAsyncLink = {
  referrer_log() {},
  swap() {},
};

const siteMode = getSiteMode();

if (siteMode === Mode.Top || siteMode === Mode.ExternalFrame) {
  console.log(`[mode] ${siteMode}, loading visualBootstrap`);
  import(/* webpackChunkName: "visualBootstrap" */ './visualBootstrap').then(
    (module) => module.setup(),
  );
} else if (siteMode === Mode.InternalFrame) {
  console.log(`[mode] ${siteMode}, loading communicationBootstrap`);
  import(/* webpackChunkName: "communicationBootstrap" */ './communicationBootstrap').then(
    (module) => module.setup(),
  );
}

// if (window.performance && window.performance.timing) {
//   window.addEventListener('load', () => {
//     setTimeout(() => {
//       const timings = window.performance.timing;
//       grooves.track('Performance Timed', {
//         dnsTiming: timings.domainLookupEnd - timings.domainLookupStart,
//         tcpTiming: timings.connectEnd - timings.connectStart,
//         requestTiming: timings.responseStart - timings.connectEnd,
//         responseTiming: timings.responseEnd - timings.responseStart,
//         processingTiming: timings.loadEventStart - timings.domLoading,
//         onLoadTiming: timings.loadEventEnd - timings.loadEventStart,
//         totalPageLoadTime: timings.loadEventEnd - timings.navigationStart,
//       });
//     }, 0);
//   });
// }
