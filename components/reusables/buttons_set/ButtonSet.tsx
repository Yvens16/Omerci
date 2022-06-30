import React from 'react'
import Button from '@components/buttons/Button';
import { IButtonSet } from '../interfaces';

function ButtonSet({ cancel, validate, cancelText, validateText }: IButtonSet) {
  return (
    <div className="buttons w-full flex justify-between mb-12t xl:max-w-laptopContent xl:mx-auto">
    <Button myClass={'mr-12t'} handleClick={cancel} type={'secondary'} size={'big'}>{cancelText}</Button>
    <Button myClass={''} handleClick={validate} type={'primary'} size={'big'}>{validateText}</Button>
  </div>
  )
}

export default ButtonSet