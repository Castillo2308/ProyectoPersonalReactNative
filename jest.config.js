module.exports = {
  preset: 'react-native',
  setupFiles: [
    '<rootDir>/jest.setup.js',
    'react-native-gesture-handler/jestSetup',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-gesture-handler|react-native-reanimated|react-native-screens)/)'
  ],
};
