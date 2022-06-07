import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import CreateMessage from './CreateMessage'


export default {
  title: "CreateMessage",
  component: CreateMessage,
  decorators: [withDesign],
  args: {}
} as ComponentMeta<typeof CreateMessage>

const Template: ComponentStory<typeof CreateMessage> = (args) => <CreateMessage {...args}></CreateMessage>


export const CreateMsg = Template.bind({});
CreateMsg.args = {};

CreateMsg.parameters = {
  design : {
    type: "figma",
    url: "",
  }
}