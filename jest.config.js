module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testResultsProcessor: "jest-sonar-reporter",
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{ts,vue}", "!**/node_modules/**", "!**/e2e/**"],
  coverageDirectory: 'coverage/unit'
}
