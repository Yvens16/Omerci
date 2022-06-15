import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import Modal from './Modal'
import DeleteMessageModal from './DeleteMessageModal';


const ProfilPicture =  '/avatars/girl.jpg';
const backgroundsUrl = ["#CEEC97", "#F4B393", "#FC60A8", "#7A28CB", "#494368"];

export default {
  title: "Modal Params",
  component: Modal,
  decorators: [withDesign],
  args: {
    values: {
      name: "name",
      title: "title",
      hasCagnotte: false,
      isPremium: false,
    }
  }
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args}></Modal>


export const ModalParams = Template.bind({});
ModalParams.args = {
  show: true,
  photoUrl: ProfilPicture,
  backgrounds: backgroundsUrl,
};

export const DeleteMsgModal = () => <DeleteMessageModal show={true}></DeleteMessageModal>

ModalParams.parameters = {
  design : {
    type: "figma",
    url: "https://www.figma.com/file/EATsHC9cVJPyij0Vljet1y/Space-Card-customisation?node-id=666%3A20787",
  }
}