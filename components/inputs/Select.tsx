import React, { useState, useEffect, useRef } from 'react';
import CaretDown from '../../public/icons/arrow/caret_down.svg';
import CaretUp from '../../public/icons/arrow/caret_up.svg';

interface SelectParams {
  optionList: string[],
  getSelectedValue(val: string): void,
};

const Select = ({ optionList, getSelectedValue }: SelectParams) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(optionList[0]);
  const selectRef = useRef<HTMLDivElement>(null);
  const handleChoice = (option: string) => {
    setSelectedValue(option);
    getSelectedValue(option);
    setOpen(false);
  }
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
    <>
      <div
        onClick={toggle}
        className={`relative flex justify-between items start p-8t my-8t border border-solid ${isOpen ? 'border-primary' : 'border-input_default'} rounded-8t`}>
        <span className={`${isOpen ? 'text-primary' : ''}`}>{selectedValue}</span>
        {isOpen
          ? <CaretUp className='fill-primary absolute top-1/2 right-0 -translate-y-1/2' />
          : <CaretDown className='absolute top-1/2 right-0 -translate-y-1/2' />}
      </div>
      {isOpen
        ? <div
          ref={selectRef}
          className="flex flex-col items-start justify-between p-16t my-8t rounded-12t border border-solid border-primary">
          {optionList
            ? optionList.map((val, idx) => (
              <span className='p-10t hover:bg-secondary_fill' onClick={() => handleChoice(val)} key={idx}>{val}</span>
            )) : null}
        </div> : null}

    </>
  );
}


export default Select;