module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  "plugins": [
    ["module-resolver", {
      "alias": {
        "@ussu/basil": './packages/basil'
      },
      "extensions": [".js", ".ts", ".tsx", ".ios.js", ".android.js"]
    }],
    "@babel/plugin-transform-runtime",
  ],
  "env": {
    "production": {
      "plugins": ["transform-remove-console"]
    },
  }
};
