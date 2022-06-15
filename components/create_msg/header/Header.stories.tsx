import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import CreateMsgHeader from "./Header";


export default {
  title: "CreateMsgHeader",
  component: CreateMsgHeader,
  decorators: [withDesign],
} as ComponentMeta<typeof CreateMsgHeader>

const Template: ComponentStory<typeof CreateMsgHeader> = (args) => <CreateMsgHeader {...args}></CreateMsgHeader>


export const Head = Template.bind({});
Head.args = {};

Head.parameters = {
  design : {
    type: "figma",
    url: "",
  }
}