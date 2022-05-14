import { ComponentStory, ComponentMeta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'
import Select from './Select'

// const days = [{label: "Lundi", value: "Lundi"}, {label: "Mardi", value: "Mardi"}, {label: "Mercredi", value: "Mercredi"}, {label: "Jeudi", value: "Jeudi"}, {label: "Vendredi", value: "Vendredi"}, {label: "samedi", value: "samedi"}, {label: "Dimanche", value: "Dimanche"}];
const days = new Array(31).fill(0, 0).map((el, idx) => {
  return {label: `${idx+1}`, value: `${idx+1}`}
})
const months = [{label: "Janvier", value: "1"}, {label: "Février", value:"2"}, {label: "Mars", value: "3"}, {label: "Avril", value: "4"}];
const years = [{label: "2018", value: "2018"}, {label: "2019", value: "2019"}, {label: "2020", value: "2020"}, {label: "2021", value: "2021"}]

export default {
  title: "Custom Select",
  component: Select,
  decorators: [withDesign],
  args: {
    selectedItem: "",
    defaultValue: "DefaultValue",
    showOptionList: false,
  }
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => <Select {...args}></Select>


export const DaySelect = Template.bind({});
DaySelect.args = {
  optionList: days,
};

export const MonthSelect = Template.bind({});
MonthSelect.args = {
  optionList: months,

};

export const YearSelect = Template.bind({});
YearSelect.args = {
  optionList: years,
};

DaySelect.parameters = {
  design : {
    type: "figma",
    url: "",
  }
}