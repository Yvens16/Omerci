import React, { useState } from 'react';
import Dot from '../../public/icons/misc/dot_05_xl.svg';
import Check from '../../public/icons/basic/check_big.svg';
interface CheckboxParams {
  labelText: string,
  type: string,
  handleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void,
  name: string,
  isCheck: boolean,
}
const Checkbox = ({labelText, type, handleCheck, name, isCheck}: CheckboxParams) => {
  return (
    <div className='flex items-center' >
      <input type="checkbox" name={name} checked={isCheck} onChange={handleCheck} id={name} className='opacity-0 absolute h-8 w-8'/>
      <div className={`flex bg-white justify-center items-center border border-solid border-secondary_fill w-[24px] h-[24px] ${type === 'circle' ? 'rounded-full' : `rounded-4t ${isCheck ? 'bg-primary' : ''}`}`}>
        {isCheck
        ? type === 'circle' ? <Dot className='fill-primary'/> : <Check className='fill-white'/>
        :null}
      </div>
    {labelText ? <label htmlFor={name} className={`select-none mx-8t`}>{labelText}</label> : null}
    </div>
  );
}

export default Checkbox;
