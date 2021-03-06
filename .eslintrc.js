module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['node_modules/'],
  rules: {
    "react/prop-types": "off",
    "react/boolean-prop-naming": "warn",
    "react/button-has-type": "error",
    "react/destructuring-assignment": "warn",
    "react/no-array-index-key": "warn",

    "@typescript-eslint/explicit-function-return-type": ["warn", {
      "allowExpressions": true,
      "allowTypedFunctionExpressions": true
    }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    "@typescript-eslint/array-type": [2,{
      "default": "array"
    }],

    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/prefer-includes": "warn",
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/require-await": "warn",
    "@typescript-eslint/restrict-plus-operands": "warn",
    "@typescript-eslint/restrict-template-expressions": ["warn", { allowNumber: true }],
    "@typescript-eslint/generic-type-naming": ["warn", '^T[A-Z][a-zA-Z]+$'],


  }
}
