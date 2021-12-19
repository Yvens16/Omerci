import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from './Button'
import BrandIcon from '../../public/icons/Alarm.svg'

const story = {
  title:'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export default story;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args}>
{args.children}
</Button>

export const Primary = Template.bind({});
Primary.args = {  myClass:'bg-primary text-white', type:'primary', handleClick: () => console.log('primary button'), children: <span className=''>Primary</span>}

export const PrimaryBig = Template.bind({});
PrimaryBig.args = {  myClass:'bg-primary text-white px-6 py-3', type:'primary', handleClick: () => console.log('primary button'), children: <span className=''>Primary</span>}

export const PrimaryWithIcon = Template.bind({});
PrimaryWithIcon.args = { myClass:'bg-primary text-white', type:'primary', handleClick: () => console.log('primary button'), children: <>
<BrandIcon className='fill-white mr-2'/>
<span className=''>Primary Icon</span>
</>}

export const IconButton = Template.bind({});
IconButton.args = { myClass:'bg-primary text-white', type:'primary', handleClick: () => console.log('primary button'), children: <>
<BrandIcon className='fill-white'/>
</>}

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {  myClass:'bg-secondary_fill text-primary', type:'secondary', handleClick: () => console.log('secondary button'), children: <span className=''>Secondary</span>}

export const SecondaryBig = Template.bind({});
SecondaryBig.args = {  myClass:'px-6 py-3', type:'secondary', handleClick: () => console.log('secondary button'), children: <span className=''>Secondary</span>}

export const SecondaryWithIcon = Template.bind({});
SecondaryWithIcon.args = {  myClass:'bg-secondary_fill text-primary', type:'secondary', handleClick: () => console.log('secondary button'), children: <><BrandIcon className='fill-primary mr-2'/><span className=''>Secondary</span></>}

export const SecondaryIconButton = Template.bind({});
SecondaryIconButton.args = { myClass:'', type:'secondary', handleClick: () => console.log('secondary Icon'), children: <>
<BrandIcon className='fill-primary'/>
</>}

export const ThirdButton = Template.bind({});
ThirdButton.args = {  myClass:'', type:'third', handleClick: () => console.log('primary button'), children: <span className=''>Third</span>}

export const ThirdWithIcon = Template.bind({});
ThirdWithIcon.args = {  myClass:'', type:'third', handleClick: () => console.log('primary button'), children: <>
<BrandIcon className='fill-third mr-2'/>
<span className=''>Third Icon</span>
</>}

export const ThirdIcon = Template.bind({});
ThirdIcon.args = {  myClass:'', type:'third', handleClick: () => console.log('primary button'), children: <BrandIcon className='fill-third'/>}
// export const DeleteButton = Template.bind({});
// DeleteButton.args = {  myClass:'bg-danger text-white', handleClick: () => console.log('primary button'), children: <span className=''>Delete</span>}

