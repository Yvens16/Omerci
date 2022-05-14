import { ComponentStory, ComponentMeta } from '@storybook/react'
import InfoModal from './InfoModal';

const story = {
  title: 'InfoModal',
  component: InfoModal,
} as ComponentMeta<typeof InfoModal>;

export default story;

const Template: ComponentStory<typeof InfoModal> = (args) => <InfoModal {...args}>
{args.children}
</InfoModal>

export const OnboardingModal = Template.bind({});
OnboardingModal.args = { show: true, closeModal: () => console.log('Close Onboarding Modal'), children: <>
  <h1>Helloo</h1>
</> }

// children, show = false, closeModal, titleHtml