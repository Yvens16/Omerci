import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import Recipient from './Recipient'


export default {
  title: "send_card_recipient",
  component: Recipient,
  decorators: [withDesign],
  args: {}
} as ComponentMeta<typeof Recipient>

const Template: ComponentStory<typeof Recipient> = (args) => <Recipient {...args}></Recipient>


export const RecipientStr = Template.bind({});
RecipientStr.args = {};

RecipientStr.parameters = {
  design : {
    type: "figma",
    url: "https://www.figma.com/file/lMAq7G7AXmW04VR7qoP6JF/Send-a-space-Workflow?node-id=317%3A1251",
  }
}