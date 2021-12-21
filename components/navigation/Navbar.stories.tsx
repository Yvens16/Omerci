import Recat from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Navbar from './Navbar';
import Menu from '../../public/icons/menu/hamburger.svg';
import Cross from '../../public/icons/menu/close_big.svg';


const story = {
  title: 'navigation',
  component: Navbar,
} as ComponentMeta<typeof Navbar>;

export default story;


export const NavBar = () => <Navbar/>