import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Input from './Input';


const story = {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

export default story;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args}/>


export const PrimaryInput = Template.bind({});
PrimaryInput.args = {label: '', placeholder:'placeholder1', handleChange: () => console.log('Hello'), infoMessage: ''}

export const PrimaryInputLabel = Template.bind({});
PrimaryInputLabel.args = {label: 'Label', placeholder:'placeholder1', handleChange: () => console.log('Hello'), infoMessage: ''}

export const InputDanger = Template.bind({});
InputDanger.args = {label: 'Label', placeholder:'placeholder1', handleChange: () => console.log('Hello'), infoMessage: 'Message informatif'}