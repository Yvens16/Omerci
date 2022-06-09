import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import EmailSettings from './EmailSettings'


export default {
  title: "settings_email",
  component: EmailSettings,
  decorators: [withDesign],
  args: {
    settings: {
      instructions: true,
      new_message: false,
      card_opened: true,
      card_not_sent: false,
    },
    handleInputs: () => console.log("Hello")
  }
} as ComponentMeta<typeof EmailSettings>

const Template: ComponentStory<typeof EmailSettings> = (args) => <EmailSettings {...args}></EmailSettings>


export const EmailStettingsStr = Template.bind({});
EmailStettingsStr.args = {};

EmailStettingsStr.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/jnPIwJNmkB23t0Wma4R42Q/Account-settings?node-id=329%3A2454",
  }
}