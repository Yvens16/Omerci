import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import AddNewMessage from './AddNewMessage';


export default {
  title: 'Add new Message',
  component: AddNewMessage,
  decorators: [withDesign],
} as ComponentMeta<typeof AddNewMessage>;



const Template: ComponentStory<typeof AddNewMessage> = (args) => <AddNewMessage {...args}></AddNewMessage>

export const AddNewMessageCard = Template.bind({});
AddNewMessageCard.args = {
}

AddNewMessageCard.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/EATsHC9cVJPyij0Vljet1y/Space-Card-customisation?node-id=666%3A23445',
  },
}