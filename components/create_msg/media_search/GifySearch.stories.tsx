import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import GifySearch from './GifySearch'


export default {
  title: "",
  component: GifySearch,
  decorators: [withDesign],
  args: {
    showModal: true,
  }
} as ComponentMeta<typeof GifySearch>

const Template: ComponentStory<typeof GifySearch> = (args) => <GifySearch {...args}></GifySearch>


export const GifyStr = Template.bind({});
GifyStr.args = {};

GifyStr.parameters = {
  design : {
    type: "figma",
    url: "",
  }
}