import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import CreateMessage from './CreateMessage'


export default {
  title: "CreateMessage",
  component: CreateMessage,
  decorators: [withDesign],
  args: {
    // fileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    // showWhichView: (view: "default" | "gify" | "unsplash") => void,
    // handleMessage: (e:any) => void,
    messageContent: "",
    mediaUrl: "",
    // deleteMediaState: () => void,
    fileUrlToShow: {}, // {type: "image", url: ""}
  }
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