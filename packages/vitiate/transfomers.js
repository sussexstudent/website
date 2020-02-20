var upstreamTransformer = require("metro-react-native-babel-transformer");

// For React Native version 0.52-0.55
// var upstreamTransformer = require("metro/src/transformer");

// For React Native version 0.47-0.51
// var upstreamTransformer = require("metro-bundler/src/transformer");

// For React Native version 0.46
// var upstreamTransformer = require("metro-bundler/build/transformer");

var graphqlTransformer = require("@bam.tech/react-native-graphql-transformer");
var svgTransformer = require("react-native-svg-transformer");

module.exports.transform = function({ src, filename, options }) {
  if (filename.endsWith('.gql') || filename.endsWith('.graphql')) {
    return graphqlTransformer.transform({ src, filename, options });
  } else if (filename.endsWith('.svg')) {
    return svgTransformer.transform({ src, filename, options });
  }

  return upstreamTransformer.transform({ src, filename, options });
};
