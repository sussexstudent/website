module.exports = function(api) {
  api.cache(true);

  const TARGET_PLATFORM = process.env.BABEL_ENV;
  const TARGET_ENV = process.env.NODE_ENV;

  const plugins = ["babel-plugin-lodash", "@babel/plugin-syntax-dynamic-import", "@babel/plugin-proposal-object-rest-spread"];
  const presets = ["@babel/preset-react"];

  if (TARGET_PLATFORM === 'comp') {
    presets.push(["@babel/preset-env", {
      "targets": {
        "node": "10"
      },
      "useBuiltIns": false,
      "modules": false,
      "exclude": [
        "transform-regenerator"
      ]
    }]);
  } else {
    presets.push(["@babel/preset-env", {
      "targets": {
        "browsers": ["last 2 versions", "safari 7", "IE 11"]
      },
      "useBuiltIns": false,
      "modules": false,
      "exclude": [
        "transform-regenerator"
      ]
    }]);
  }

  plugins.push(TARGET_ENV === 'production' ? ["emotion", { "hoist": true }] : ["emotion", { "sourceMap": true, "autoLabel": true }])

  return {
    presets,
    plugins,
  }
};
