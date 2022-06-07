import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import UnsplashSearch from './UnpslashSearch'


export default {
  title: "",
  component: UnsplashSearch,
  decorators: [withDesign],
  args: {}
} as ComponentMeta<typeof UnsplashSearch>

const Template: ComponentStory<typeof UnsplashSearch> = (args) => <UnsplashSearch {...args}></UnsplashSearch>


export const Unsplash = Template.bind({});
Unsplash.args = {};

Unsplash.parameters = {
  design : {
    type: "figma",
    url: "",
  }
}