const path = require("path");

module.exports = (async () => {
  const project = path.resolve(__dirname);
  const root = path.resolve(__dirname, '../../');
  return {
    resolver: {
      useWatchman: false,
      providesModuleNodeModules: ["react-native"],
      resolverMainFields: ["react-native", "dev", "browser", "main"],
      sourceExts: ["tsx", "ts", "js", "gql", "graphql"],
      extraNodeModules: {
        "@babel/runtime": path.resolve(__dirname, "./node_modules/@babel/runtime"),
        "react": path.resolve(__dirname, "./node_modules/react"),
        "date-fns": path.resolve(__dirname, "./node_modules/date-fns"),
        "lodash": path.resolve(__dirname, "./node_modules/lodash"),
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
          "@bam.tech/react-native-graphql-transformer"
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
