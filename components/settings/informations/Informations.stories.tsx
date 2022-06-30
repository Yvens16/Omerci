
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import Informations from './Informations'


export default {
  title: "settings_informations",
  component: Informations,
  decorators: [withDesign],
  args: {}
} as ComponentMeta<typeof Informations>

const Template: ComponentStory<typeof Informations> = (args) => <Informations {...args}></Informations>


export const InformationsStr = Template.bind({});
InformationsStr.args = {};

InformationsStr.parameters = {
  design : {
    type: "figma",
    url: "https://www.figma.com/file/jnPIwJNmkB23t0Wma4R42Q/Account-settings?node-id=329%3A1885",
  }
}