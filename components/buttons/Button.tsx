import React from 'react'

// type MyFunctionType = (name: string) => number; here using the "type" keyword *
interface ButtonParams {
  myClass: string;
  children: React.ReactNode,
  handleClick(): any,
  type: string,
  size: string,
  isDisabled?: boolean
  //onChange(name: string): any;  here function that accept an arguement
  //onChange(name: string): number; here function that accept an argument and return a value
  //onChange?(name: string): number; here function that is optional 
  // onChange: MyFunctionType; here using the "type" keyword in coop with the line above the interface*
}

const Button = ({myClass, children, handleClick, type, size, isDisabled}: ButtonParams) => {
  let classToUse = '';
  let primiryClass = 'bg-primary text-white flex justify-center items-center rounded-md hover:bg-primary_hover md:w-auto';
  let secondaryClass = 'bg-secondary_fill text-primary flex justify-center items-center rounded-md hover:border-solid hover:border hover:border-primary md:w-auto'
  let thirdClass = 'bg-white text-third flex justify-center items-center rounded-md hover:bg-third_hover md:w-auto';

  switch(type) {
    case 'primary':
      classToUse = primiryClass;
      break;
    case 'secondary':
      classToUse = secondaryClass;
      break;
    case 'third':
      classToUse = thirdClass;
      break;
  }
  return (
  <button
    disabled={isDisabled || false}
    className={
      `disabled:text-white disabled:bg-input_default
      ${classToUse}
      ${myClass.includes('nav') ? '' : 'text-mid'}
      ${size === 'big' ? 'py-12t px-20t': 'px-16t py-8t'}
      ${size === 'big' && type === 'third' ? 'font-semibold	': ''}
      ${myClass}
      `}
        onClick={handleClick}
      >
    {children}
  </button>
  )
}


export default Button;