module.exports = function(api) {
  api.cache(true);

  const TARGET_PLATFORM = process.env.BABEL_ENV;
  const TARGET_ENV = process.env.NODE_ENV;

  const plugins = ["babel-plugin-lodash", "@babel/plugin-syntax-dynamic-import", "@babel/plugin-proposal-object-rest-spread"];
  const presets = []
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
    if (process.env.NODE_ENV === 'test') {
      presets.push(["@babel/preset-env", {
        "targets": {
          "node": "12.0.0",
        },
        "useBuiltIns": false,
        "modules": 'commonjs',
        "exclude": [
          "transform-regenerator"
        ],
        loose: true,
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
      ],
      loose: true,
    }]);
    }
  }

  presets.push("@babel/preset-react");
  presets.push("@emotion/babel-preset-css-prop");

  return {
    presets,
    plugins,
  }
};
