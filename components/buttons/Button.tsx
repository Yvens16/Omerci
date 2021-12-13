import React from 'react'

// type MyFunctionType = (name: string) => number; here using the "type" keyword *
interface ButtonParams {
  myClass: string;
  children: any,
  handleClick(): any,
  //onChange(name: string): any;  here function that accept an arguement
  //onChange(name: string): number; here function that accept an argument and return a value
  //onChange?(name: string): number; here function that is optional 
  // onChange: MyFunctionType; here using the "type" keyword in coop with the line above the interface*
}

const Button = ({myClass, children, handleClick}: ButtonParams) => (
  <button 
    className={
      `${myClass}
        flex justify-center items-center py-2 px-4 mx-auto w-11/12 rounded-md hover:bg-primary_hover
        md:w-4/12
        lg:w-2/12
      `}
        onClick={handleClick}
      >
    {children}
  </button>
)

export default Button;