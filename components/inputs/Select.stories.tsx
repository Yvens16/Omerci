import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Select from './Select';

const story = {
  title:'Select',
  component: Select,
} as ComponentMeta<typeof Select>;

export default story;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args}/>

export const SelectInput = Template.bind({});
SelectInput.args = {optionList: ['Pomme', 'Orange', 'Poire'], getSelectedValue: (val) => console.log(val)}
