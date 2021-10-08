const { pathsToModuleNameMapper } = require(`ts-jest/utils`)
const { compilerOptions } = require(`../tsconfig.json`)
const paths = compilerOptions.paths ? compilerOptions.paths : {}
module.exports = {
  moduleFileExtensions: [`js`, `jsx`, `ts`, `tsx`],
  transform: {
    '^.+\\.tsx?$': `ts-jest`,
  },
  testMatch: [`**/*.(test|spec).(ts|tsx)`],
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsconfig: `tsconfig.jest.json`,
      diagnostics: false,
    },
  },
  rootDir: `../`,
  setupFilesAfterEnv: [`<rootDir>/test/jest.setup.ts`],
  testPathIgnorePatterns: [
    `<rootDir>/.next/`,
    `<rootDir>/node_modules/`,
    `<rootDir>/cypress/`,
    `<rootDir>/webdriverio/`,
  ],
  preset: `ts-jest`,
  coveragePathIgnorePatterns: [`/node_modules/`],
  coverageReporters: [`json`, `lcov`, `text`, `text-summary`],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(paths, {
      prefix: `<rootDir>/`,
    }),
    '\\.(scss|sass|css)$': `identity-obj-proxy`,
  },
}
