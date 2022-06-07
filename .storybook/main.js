const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path')


module.exports = {
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];
    return config;
  },
  stories: ['../components/**/*.stories.tsx'],
  "addons": [
    {
      name: 'storybook-addon-next',
      options: {
        nextConfigPath: path.resolve(__dirname, '../next.config.js')
      },
    },
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // "storybook-addon-next",
    'storybook-addon-designs',
  ],
  "framework": "@storybook/react",
  staticDirs: ['../public'],
  core: {
    builder: "webpack5",
  },
  env: (config) => ({
    ...config,
    NEXT_PUBLIC_GIFY_BETA_KEY: process.env.NEXT_PUBLIC_GIFY_BETA_KEY,
    NEXT_PUBLIC_UNSPLASH_ACCESS_KEY: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
    NEXT_PUBLIC_UNSPLASH_SECRET_KEY: process.env.NEXT_PUBLIC_UNSPLASH_SECRET_KEY
  })
}