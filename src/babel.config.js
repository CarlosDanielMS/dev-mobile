module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // IMPORTANTE: Este plugin deve ser o ÚLTIMO da lista
      'react-native-reanimated/plugin',
    ],
  };
};