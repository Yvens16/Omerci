import React, { useState, useEffect, useRef } from 'react';

interface ISelect {
  optionList: { label: string; value: string; }[],
  selectedItem: string,
  defaultValue: string,
  showOptionList: boolean,
  changeOption: (e: React.SyntheticEvent) => void,
  name: string,
}
function Select({ optionList, selectedItem, defaultValue, changeOption, name }: ISelect) {
  const [isOpen, setOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const toggle = () => setOpen(!isOpen);
  const handleClickOutside = (e: any) => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });
  return (
    <div ref={selectRef} className={`container mr-8t relative min-w-fit max-h-[100px] p-8t rounded-8t border border-solid border-input_default h-fit`}>
      <div className="text-black text-center currentValue  pb-0" onClick={toggle}>{selectedItem ? selectedItem : defaultValue}</div>
      <div className={`${isOpen ? "w-full overflow-y-scroll absolute min-w-fit -bottom-[110px] left-[0px] border border-solid border-input_default" : ""} max-h-[100px] bg-white`}>
        {isOpen && optionList.map((el, idx) => (
          <div id={name} onClick={(e) => {
            changeOption(e);
            setOpen(false);
          }} className={`text-center p-[8px] cursor-pointer text-black  option hover:bg-primary hover:text-white ${selectedItem === el.value ? "hidden" : ""}`} key={idx}>{el.label}</div>
        ))
        }
      </div>
    </div>
  )
}

export default Select;