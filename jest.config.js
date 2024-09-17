/** @type {import('ts-jest').JestConfigWithTsJest} **/

module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};

// import {Config} from "jest"
// import {compilerOptions} from "./tsconfig.json"
// import {pathsToModuleNameMapper} from "ts-jest"

// const config: Config = {
//     preset:"ts-jest",
//     testEnvironment:"node",
//     transform: {
//          "^.+.tsx?$": ["ts-jest",{}],
//          },
//     modulePaths: [compilerOptions.baseUrl],
//     moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
// };

// export default config