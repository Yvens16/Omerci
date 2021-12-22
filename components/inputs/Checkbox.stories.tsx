
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Checkbox from './Checkbox';


const story = {
  title:'Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

export default story;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args}/>

export const CircleCheck = Template.bind({});
CircleCheck.args = {labelText: 'circle checkbox', type:'circle'};

export const SquareCheck = Template.bind({});
SquareCheck.args = {labelText: 'squared checkbox', type:''};