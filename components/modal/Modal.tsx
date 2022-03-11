import React, { useState } from 'react';
import Cross from '../../public/icons/menu/close_small.svg';
import { IModal } from './interfaces';


const Modal =  ({children, show=false, closeModal}: IModal) => {
  const showHideClassName = show ? "block" : "hidden";
  return (
    <div className={`w-screen h-screen bg-modal fixed top-0 left-0 ${showHideClassName}`}>
      <div
        className='bg-white rounded-12t fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 boder border-solid border-secondary_fill p-24t w-11/12 mx-auto lg:w-1/3'>
        <div className='flex justify-end cursor-pointer'><Cross onClick={closeModal} className='fill-third'/></div>
        {children}
      </div>
    </div>
  );
}

export default Modal;