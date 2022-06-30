import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import Message from './Message';

export default {
  title: 'Message Cards',
  component: Message,
  decorators: [withDesign],
  args: {
    mediaUrl: 'https://media.giphy.com/media/H47n1FPuoK8aPmxq6c/giphy.gif',
    ownerName: "Yvens Belaston",
    createdDate: "2022-04-25T09:08:34.123"
    // https://media.giphy.com/media/l0HlL2Z9gAJ6ve9sk/giphy.gif
    // https://media.giphy.com/media/FizSVay8SBrEI/giphy.gif
  }
} as ComponentMeta<typeof Message>;
const Template: ComponentStory<typeof Message> = (args) => <Message {...args}></Message>
export const MessageCardIsAdminNotOwnCard = Template.bind({});
export const MessageCardIsAdminOwnCard = Template.bind({});
export const MessageCardIsParticipantOwnCard = Template.bind({});
export const MessageCardIsParticipantNotOwnCard = Template.bind({});

MessageCardIsAdminNotOwnCard.args = {
  editRight: "delete",
  media: { type: "image", url: "https://media.giphy.com/media/H47n1FPuoK8aPmxq6c/giphy.gif" },
  owner: { familyName: "Doe", name: "John", email: "j@gmail.com" },
  createdDate: "",
  message: "",
  // toggleModal: () => void,
  // toggleDeleteModal: () => void,
  // messageId: string,
}
MessageCardIsAdminOwnCard.args = {
  editRight: "modifyAndDelete",
  media: { type: "image", url: "https://media.giphy.com/media/H47n1FPuoK8aPmxq6c/giphy.gif" },
  owner: { familyName: "Doe", name: "John", email: "j@gmail.com" },
  createdDate: "",
  message: "",
}
MessageCardIsParticipantOwnCard.args = {
  editRight: "modifyAndDelete",
  media: { type: "image", url: "https://media.giphy.com/media/H47n1FPuoK8aPmxq6c/giphy.gif" },
  owner: { familyName: "Doe", name: "John", email: "j@gmail.com" },
  createdDate: "",
  message: "",
}

MessageCardIsParticipantNotOwnCard.args = {
  // editRight: "nothing"
  media: { type: "image", url: "https://media.giphy.com/media/H47n1FPuoK8aPmxq6c/giphy.gif" },
  owner: { familyName: "Doe", name: "John", email: "j@gmail.com" },
  createdDate: "",
  message: "",
}

MessageCardIsAdminNotOwnCard.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/EATsHC9cVJPyij0Vljet1y/Space-Card-customisation?node-id=666%3A19709',
  },
}
// MessageCardIsAdminOwnCard.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/file/EATsHC9cVJPyij0Vljet1y/Space-Card-customisation?node-id=666%3A19709',
//   },
// }
// MessageCardIsParticipantOwnCard.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/file/EATsHC9cVJPyij0Vljet1y/Space-Card-customisation?node-id=666%3A19709',
//   },
// }
MessageCardIsParticipantNotOwnCard.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/EATsHC9cVJPyij0Vljet1y/Space-Card-customisation?node-id=666%3A22849',
  },
}