import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Navbar from './Navbar';


const story = {
  title: 'navigation',
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

export default story;


export const NavBar = () => <Navbar/>