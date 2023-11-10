import type { Config } from "jest";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: ".*\\.*spec\\.ts$",
  transform: {
    ".+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coveragePathIgnorePatterns: ["main.ts"],
  coverageDirectory: "./coverage",
  preset: "ts-jest",
  testEnvironment: "node",
};

export default config;
