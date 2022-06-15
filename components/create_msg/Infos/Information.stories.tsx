import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import Information from './Information'


export default {
  title: "Message Informations",
  component: Information,
  decorators: [withDesign],
  args: {}
} as ComponentMeta<typeof Information>

const Template: ComponentStory<typeof Information> = (args) => <Information {...args}></Information>


export const Info = Template.bind({});
Info.args = {};

Info.parameters = {
  design : {
    type: "figma",
    url: "",
  }
}