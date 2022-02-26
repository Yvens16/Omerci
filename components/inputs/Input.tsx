import React from 'react';

interface InputParams {
  label: string,
  placeholder: string,
  handleChange(e: any): void,
  infoMessage: string,
  isDisabled?: boolean,
};


const Input = ({label, placeholder, handleChange, infoMessage, isDisabled}: InputParams) => {
  return (
    <div className='flex flex-col font-base'>
      {label ? <span className='text-left'>{label}</span> : null}
      <input
        disabled={isDisabled}
        className={`rounded-8t font-normal py-8t px-8t flex items-start border border-solid border-input_default
        focus:outline-none focus:border-solid focus:border focus:border-primary
        placholder-input_placeholder my-4t
        ${infoMessage ? 'placeholder-danger border-danger text-danger' : null}`}
        type="text" placeholder={placeholder} onChange={handleChange}/>
      {infoMessage ? <span className={`text-12t text-danger`}>{infoMessage}</span> : null}
    </div>
  );
}

export default Input;