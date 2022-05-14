import React from 'react'
interface ISelect {
  optionList: { label: string; value: string; }[],
  selectedItem: string,
  defaultValue: string,
  showOptionList: boolean,
  changeOption: () => {},
}
function Select({optionList, selectedItem, defaultValue, showOptionList, changeOption}: ISelect) {
  return (
    <div className="container w-fit p-8t rounded-8t border border-solid border-input_default">
      <div className="text-black currentValue  pb-0" onClick={changeOption}>{selectedItem ? selectedItem : defaultValue}</div>
      {showOptionList && optionList.map((el,idx) => (
        <div onClick={changeOption} className={`cursor-pointer text-black  option hover:bg-primary hover:text-white ${selectedItem === el.value ?  "hidden" : ""}`} key={idx}>{el.label}</div>
      ))
      }
    </div>
  )
}

export default Select;