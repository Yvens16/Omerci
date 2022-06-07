import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import Cagnotte from './Cagnotte'


export default {
  title: "",
  component: Cagnotte,
  decorators: [withDesign],
  args: {
    isCustomAmount: false
  }
} as ComponentMeta<typeof Cagnotte>

const Template: ComponentStory<typeof Cagnotte> = (args) => <Cagnotte {...args}></Cagnotte>


export const CagnotteStr = Template.bind({});
CagnotteStr.args = {};

CagnotteStr.parameters = {
  design : {
    type: "figma",
    url: "",
  }
}