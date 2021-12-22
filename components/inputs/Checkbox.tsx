import React, { useState } from 'react';
import Dot from '../../public/icons/misc/dot_05_xl.svg';
import Check from '../../public/icons/basic/check_big.svg';
interface CheckboxParams {
  labelText: string,
  type: string,
}
const Checkbox = ({labelText, type}: CheckboxParams) => {
  const [isCheck, setIsCheck] = useState(false);

  const toggle = () => setIsCheck(!isCheck);
  return (
    <div className='flex items-center' onClick={toggle}>
      <input type="checkbox" name="check" id="check" className='opacity-0 absolute h-8 w-8'/>
      <div className={`flex justify-center items-center border border-solid border-secondary_fill w-[24px] h-[24px] ${type === 'circle' ? 'rounded-full' : `rounded-4t ${isCheck ? 'bg-primary' : ''}`}`}>
        {isCheck
        ? type === 'circle' ? <Dot className='fill-primary'/> : <Check className='fill-white'/>
        :null}
      </div>
    {labelText ? <label htmlFor='check' className='select-none mx-8t'>{labelText}</label> : null}
    </div>
  );
}

export default Checkbox;
