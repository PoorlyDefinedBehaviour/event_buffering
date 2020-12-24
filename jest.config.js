module.exports = {
  rootDir: ".",
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.json",
      diagnostics: false,
    },
  },
  testEnvironment: "node",
  testRegex: ".spec.(t|j)s$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  moduleDirectories: ["node_modules", "src"],
  verbose: false,
  silent: false,
}
