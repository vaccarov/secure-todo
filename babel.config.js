
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': '.',
            '@/app': './app',
            '@/components': './app/components',
            '@/context': './context',
            '@/lib': './lib',
            '@/types': './lib/types',
            '@/globalStyles': './lib/globalStyles',
          },
        },
      ],
    ],
  };
};
