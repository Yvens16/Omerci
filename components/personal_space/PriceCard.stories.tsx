import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import PriceCard from './PriceCard';


const story = {
  title: 'PriceCard',
  component:PriceCard,
} as ComponentMeta<typeof PriceCard>;
export default story;

const Template: ComponentStory<typeof PriceCard> = (args) => <PriceCard {...args}>
</PriceCard>

export const Card = Template.bind({});
Card.args = { numberOfCard: 5, price: 19.99 , description: "Idéale si vous prévoyez plusieurs départ", buyPackage: () => console.log("I buy")};