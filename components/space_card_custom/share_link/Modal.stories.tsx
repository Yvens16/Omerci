import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import Modal from './Modal'


export default {
  title: "Share link Modal",
  component: Modal,
  decorators: [withDesign],
  args: {}
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args}></Modal>


export const ShareLink = Template.bind({});
ShareLink.args = {
  show: true,
  url: 'https://omerci.com/user6364/card6652-medium',
  closeModal: () => console.log("Helllo close the modal"),
};

ShareLink.parameters = {
  design : {
    type: "figma",
    url: "https://www.figma.com/file/EATsHC9cVJPyij0Vljet1y/Space-Card-customisation?node-id=780%3A17145",
  }
}