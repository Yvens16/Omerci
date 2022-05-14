import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import CardParams from './CardParams'


export default {
  title: "Card Params",
  component: CardParams,
  decorators: [withDesign],
  args: {
    backgroundUrl: "'/images/card_params_bg.jpg'",
    photoUrl: '/avatars/girl.jpg',
  }
} as ComponentMeta<typeof CardParams>

const Template: ComponentStory<typeof CardParams> = (args) => <CardParams {...args}></CardParams>


export const ParamsIsAdmin = Template.bind({});
ParamsIsAdmin.args = {
  isAdmin: true,
  cardTitle: "Ce n’est qu’un au revoir",
  receiverName: "Yvens Belaston",
  messageNumber: 32,
  moneyCount: 526,
};

export const ParamsInvitedUser = Template.bind({});
ParamsInvitedUser.args = {
  isAdmin: false,
  cardTitle: "Ce n’est qu’un au revoir",
  receiverName: "Yvens Belaston",
  messageNumber: 32,
  moneyCount: 526,

};

ParamsIsAdmin.parameters = {
  design: {
    type: 'figma',
    url: "https://www.figma.com/file/EATsHC9cVJPyij0Vljet1y/Space-Card-customisation?node-id=965%3A18963"
  }
}
ParamsInvitedUser.parameters = {
  design: {
    type: 'figma',
    url: "https://www.figma.com/file/EATsHC9cVJPyij0Vljet1y/Space-Card-customisation?node-id=666%3A23445"
  }
}
