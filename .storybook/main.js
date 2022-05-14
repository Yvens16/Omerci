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
}