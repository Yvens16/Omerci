import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import Header from './Header'


export default {
  title: "reusable_header",
  component: Header,
  decorators: [withDesign],
  args: {
    title: "Title",
    subtitle: "Subtitle",
    handleback: () => console.log("Going back to"),
    buttonContent: "Retour à ?"
  }
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => <Header {...args}></Header>


export const HeaderStr = Template.bind({});
HeaderStr.args = {};

HeaderStr.parameters = {
  design : {
    type: "figma",
    url: "https://www.figma.com/file/jnPIwJNmkB23t0Wma4R42Q/Account-settings?node-id=329%3A2214",
  }
}