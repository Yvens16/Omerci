import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import DeviceMedia from './DeviceMedia'


export default {
  title: "",
  component: DeviceMedia,
  decorators: [withDesign],
  args: {}
} as ComponentMeta<typeof DeviceMedia>

const Template: ComponentStory<typeof DeviceMedia> = (args) => <DeviceMedia {...args}></DeviceMedia>


export const DeviceMdia = Template.bind({});
DeviceMdia.args = {};

DeviceMdia.parameters = {
  design : {
    type: "figma",
    url: "",
  }
}