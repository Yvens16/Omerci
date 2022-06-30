import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import Section from './Section'


export default {
  title: "reusable_section",
  component: Section,
  decorators: [withDesign],
  args: {
    title: "Title",
    subtitle: "Subtitle",
    children: <div>
      <div>Hello</div>
      <div>Bye</div>
    </div>
  }
} as ComponentMeta<typeof Section>

const Template: ComponentStory<typeof Section> = (args) => <Section {...args}></Section>


export const SectionStr = Template.bind({});
SectionStr.args = {};

SectionStr.parameters = {
  design : {
    type: "figma",
    url: "",
  }
}