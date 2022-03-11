import React from 'react';

interface InputParams {
  label: string,
  placeholder: string,
  handleChange(e: any): void,
  name: string,
  infoMessage: string,
  value?: string,
  labelClass?: string,
  isDisabled?: boolean,
};


const Input = ({label, labelClass, placeholder, handleChange, infoMessage, name, value, isDisabled}: InputParams) => {
  return (
    <div className='flex flex-col font-base'>
      {label ? <span className={`text-left text-black ${labelClass}`}>{label}</span> : null}
      <input
        name={name || ''}
        value={value}
        disabled={isDisabled}
        className={`rounded-8t font-normal py-8t px-8t flex items-start border border-solid border-input_default
        focus:outline-none focus:border-solid focus:border focus:border-primary
        placholder-input_placeholder my-4t
        ${infoMessage ? 'placeholder-danger border-danger text-danger' : null}`}
        type="text" placeholder={placeholder} onChange={handleChange}/>
      {infoMessage ? <span title='infoMessage' className={`text-12t text-danger`}>{infoMessage}</span> : null}
    </div>
  );
}

export default Input;