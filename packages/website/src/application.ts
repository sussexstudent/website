import Raven from 'raven-js';
import mitt from 'mitt';
import { addClassesForFeatures } from '@ussu/common/src/libs/features';
addClassesForFeatures();
import './modules/eventRedirect';
import { getSiteMode, Mode } from '@ussu/common/src/libs/siteModeDectector';

Raven.config('https://fd478822b69843a2a3718c621c5fadad@sentry.io/158659', {
  // eslint-disable-next-line
  release: (window as any).releaseMetadata.gitRev || 'dev',
  environment: process.env.NODE_ENV,
  whitelistUrls: [/sussexstudent\.com/, /du9l8eemj97rm.cloudfront\.net/],
}).install();

// probs not great
(window as any).emitter = mitt();

const siteMode = getSiteMode();

if (siteMode === Mode.Top || siteMode === Mode.ExternalFrame) {
  console.log(`[mode] ${siteMode}, loading visualBootstrap`);
  import(
    /* webpackChunkName: "visualBootstrap" */ './visualBootstrap'
  ).then((module) => module.setup());
} else if (siteMode === Mode.InternalFrame) {
  console.log(`[mode] ${siteMode}, loading communicationBootstrap`);
  import(
    /* webpackChunkName: "communicationBootstrap" */ './communicationBootstrap'
  ).then((module) => module.setup());
}
