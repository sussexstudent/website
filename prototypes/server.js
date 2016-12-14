const path = require('path');
const nunjucks = require('nunjucks');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config.js');
const setupRoutes = require('./pages');

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  contentBase: '/assets',
  hot: true,
  compress: true,
  // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
  staticOptions: {
  },

  proxy: {
    '/': {
      target: 'http://localhost:8080/',
      secure: false,
    },
  },


  clientLogLevel: 'info',
  publicPath: '/assets',

  // webpack-dev-middleware options
/*  quiet: false,
  noInfo: false,
  lazy: true,
  filename: 'bundle.js',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
  path: '/',
  stats: { colors: true },
  */
});

server.listen(4040, 'localhost', function() {});
