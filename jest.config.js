/* eslint-disable no-undef */
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    resetMocks: false,
    setupFiles: ['jest-localstorage-mock'],
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!@foo)'],
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    transform: {'^.+\\.(ts|tsx)$': 'ts-jest'},
    moduleNameMapper: {
        '^.+\\.(css|less|scss|sass|png|svg)$': 'babel-jest'
    }
};
