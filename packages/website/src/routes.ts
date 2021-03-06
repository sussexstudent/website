import { PreRouter } from '@ussu/common/src/libs/PreRouter';

export default new PreRouter([
  /^\/$/,
  '/whats-on', // Events App
  '/browse', // Content Browser App
  '/sport-societies-media/discover',
  '/book-market', // Book Market App
  '/freshers', // Content API Controlled
  '/services', // Content API Controlled
  '/forms',
  '/kb',
  '/content-root-example',
  '/search',
  '/event-discovery',
  /^\/get-involved$/,
  /^\/get-involved\/societies-and-student-media/,
  /^\/get-involved\/sports-clubs/,
  /^\/get-involved\/decision-making/,
  /^\/about-us\/contact/,
  /^\/about-us$/,
  /^\/about-us\/shops-and-bars/,
  /^\/support$/,
  /^\/sport-societies-media$/,
  /^\/volunteer$/,
  '/get-involved-next',
  '/get-involved/campaigns-toolkit',
  '/about-us-next',
  /^\/volunteer\/support/,
  /^\/about-us\/officers/,
]);
