module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    '<rootDir>/src',
    '<rootDir>/dist',
    '<rootDir>/node_modules',
  ],
};