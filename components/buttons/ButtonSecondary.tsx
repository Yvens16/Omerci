import React from 'react'

interface ButtonParams {
  myClass: string;
  children: any,
  handleClick(): any,
}

const ButtonSecondary = ({myClass, children, handleClick}: ButtonParams) => (
  <button 
    className={
      `${myClass}
        bg-secondary_fill text-primary
        flex justify-center items-center py-2 px-4 mx-auto rounded-md w-8/12
        hover:border-solid hover:border-2 hover:border-primary
        md:w-auto
      `}
        onClick={handleClick}
      >
    {children}
  </button>
)

export default ButtonSecondary;