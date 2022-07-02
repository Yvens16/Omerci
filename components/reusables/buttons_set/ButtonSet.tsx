import React from 'react'
import Button from '@components/buttons/Button';
import { IButtonSet } from '../interfaces';

function ButtonSet({ cancel, validate, cancelText, validateText, isDisabled }: IButtonSet) {
  return (
    <div className="buttons w-full grid grid-cols-2 justify-between mb-12t max-w-laptopContent mx-auto">
    <Button isDisabled={isDisabled} myClass={'mr-12t'} handleClick={cancel} type={'secondary'} size={'big'}>{cancelText}</Button>
    <Button isDisabled={isDisabled} myClass={''} handleClick={validate} type={'primary'} size={'big'}>{validateText}</Button>
  </div>
  )
}

export default ButtonSet