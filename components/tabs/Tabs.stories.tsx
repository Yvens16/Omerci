import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Tabs from './Tabs';


const story = {
  title: 'Tabs Basic',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;


export default story;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args}></Tabs>


export const BasicTabs = Template.bind({});
BasicTabs.args = { tabs: ['Hello1', 'Hello2', 'Hello3']}