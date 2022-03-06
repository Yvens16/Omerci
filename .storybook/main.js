module.exports = {
  stories: ['../components/**/*.stories.tsx'],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-next",
  ],
  "framework": "@storybook/react",
  staticDirs: ['../public'],
  core: {
    builder: "webpack5",
  },
}