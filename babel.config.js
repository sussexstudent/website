module.exports = function(api) {
  api.cache(true);

  const plugins = ["babel-plugin-lodash", "@babel/plugin-syntax-dynamic-import", "@babel/plugin-proposal-object-rest-spread"];
  const presets = ["@babel/preset-react"];

  if (process.env.BABEL_ENV === 'bundle') {
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
  } else if (process.env.BABEL_ENV === 'comp') {
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
  }

  return {
    presets,
    plugins,
  }
};
