import { ComponentStory, ComponentMeta } from '@storybook/react'
import Modal from './Modal';


const story = {
  title: 'Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

export default story;


export const Modale = () => <Modal customClass='' show={true} closeModal={() => console.log('close')}><span>Hello</span></Modal>