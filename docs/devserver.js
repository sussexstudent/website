const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.dev.config.js');

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  contentBase: '/',
  hot: true,
  compress: true,
  // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
  staticOptions: {},
  historyApiFallback: true,

  clientLogLevel: 'info',
  publicPath: '/',

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

server.listen(5555, 'localhost', function() {});
