const path = require("path");
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { assetExts },
  } = await getDefaultConfig();

  const project = path.resolve(__dirname);
  const root = path.resolve(__dirname, '../../');
  return {
    resolver: {
      useWatchman: true,
      providesModuleNodeModules: ["react-native"],
      resolverMainFields: ["react-native", "dev", "browser", "main"],
      sourceExts: ["tsx", "ts", "js", "gql", "graphql", 'svg'],
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      extraNodeModules: {
        "@babel/runtime": path.resolve(__dirname, "./node_modules/@babel/runtime"),
        "react": path.resolve(__dirname, "./node_modules/react"),
        "date-fns": path.resolve(__dirname, "./node_modules/date-fns"),
        "lodash": path.resolve(__dirname, "./node_modules/lodash"),
        "react-native-svg": path.resolve(__dirname, "./node_modules/react-native-svg"),
        "@apollo/react-hooks": path.resolve(__dirname, "./node_modules/@apollo/react-hooks"),
      },
      blacklistRE: /(.*\/__fixtures__\/.*|node_modules[\/\\]react[\/\\]dist[\/\\].*|website\/node_modules\/.*|heapCapture\/bundle\.js|.*\/__tests__\/.*)$/
    },
    // transformer: {

    // },
    // serializer: {
    //   getModulesRunBeforeMainModule: () => [
    //     path.join(
    //       root,
    //       "node_modules/react-native/Libraries/Core/InitializeCore.js"
    //     )
    //   ],
    //   getPolyfills: require(path.join(
    //     root,
    //     "node_modules/react-native/rn-get-polyfills"
    //   ))
    // },
    transformer: {
      experimentalImportSupport: false,
      inlineRequires: false,
        babelTransformerPath: require.resolve(
          './transfomers.js',
        )
    },
    server: {},
    projectRoot: project,
    watchFolders: [
      root,
      project,
      path.join(root, "node_modules"),
      path.join(path.resolve(__dirname, '../basil'), "node_modules"),
      path.join(project, "node_modules")
    ]
  };
})();
