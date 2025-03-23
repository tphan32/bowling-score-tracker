import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/.next/",
    "/coverage/",
    "src/app/utils/calculateScoreV1.ts",
    "src/app/utils/calculateScoreV2.ts",
    "src/app/constants.ts",
    "src/app/fixtures",
    "src/app/layout.tsx",
    "src/app/types",
  ],
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);

