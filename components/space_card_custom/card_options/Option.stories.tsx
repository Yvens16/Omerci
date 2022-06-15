import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import Options from './Option'
import MobileOption from './MobileOption';
import { IOptions } from './interfaces';


export default {
  title: "Option Mobile/Desktop",
  component: Options,
  decorators: [withDesign],
  args: {
    toggleDeleteModal: () => console.log("toggle DeleteModale"),
    modifyMessage: () => console.log("modify Message")
  }
} as ComponentMeta<typeof Options>

const Template: ComponentStory<typeof Options> = (args) => <Options {...args}></Options>


export const DesktopOptions = Template.bind({});
DesktopOptions.args = {};
export const MobileOpt = (args: IOptions) => <MobileOption {...args}></MobileOption>
MobileOpt.parameters = {
  design : {
    type: "figma",
    url: "https://www.figma.com/file/vnSLsoV3a3PN35hFHKJdUX/Personal-space-management?node-id=281%3A7191",
  }
}

DesktopOptions.parameters = {
  design : {
    type: "figma",
    url: "https://www.figma.com/file/EATsHC9cVJPyij0Vljet1y/Space-Card-customisation?node-id=851%3A21605",
  }
}