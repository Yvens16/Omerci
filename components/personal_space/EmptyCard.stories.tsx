import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import EmptyCard from './EmptyCard';
import Button from '../../components/buttons/Button';
import MoreIcon from '../../public/icons/misc/plus.svg';
import emptyImg from '../../public/emptyCard.svg'

const story = {
  title: 'EmptyCard',
  component: EmptyCard,
} as ComponentMeta<typeof EmptyCard>;
export default story;

const Template: ComponentStory<typeof EmptyCard> = (args) => <EmptyCard {...args}></EmptyCard>

export const CardEmpty = Template.bind({});
CardEmpty.args = {
  imgLink: '/emptyCard.svg', text: "Vous n'avez pas encore de carte crée"
}