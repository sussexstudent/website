module.exports = {
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/./..//__mocks__/fileMock.js",
    "\\.(css|less)$": "<rootDir>/../../__mocks__/styleMock.js"
  },
  testPathIgnorePatterns: [
    "<rootDir>/(build|docs|app|node_modules)/"
  ],
  testEnvironment: "jsdom",
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.{svg,d.ts,stories.tsx}"
  ],
  setupFiles: [
    "<rootDir>/../../__mocks__/browserMocks.js"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/../../config/setupTests.js"
  ],
  globals: {
    "ts-jest": {
      "babelConfig": true
    }
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  testURL: "http://localhost/",
  snapshotSerializers: [
    "jest-emotion"
  ]
};
