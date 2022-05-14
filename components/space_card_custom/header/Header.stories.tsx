import { ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import Header from './Header'


export default {
  title: "Header",
  component: Header,
  decorators: [withDesign],
} as ComponentMeta<typeof Header>;

export const MessagesHeader = () => <Header/>

MessagesHeader.parameters = {
  design: {
    type: 'figma',
    url: "https://www.figma.com/file/EATsHC9cVJPyij0Vljet1y/Space-Card-customisation?node-id=666%3A22371"
  }
}
