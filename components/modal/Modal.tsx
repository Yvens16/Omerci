import React, { useState } from 'react';
import Cross from '../../public/icons/menu/close_big.svg';
import ArrowLeft from '../../public/icons/arrow/short_left.svg';
import { IModal } from './interfaces';


const Modal = ({ children, show = false, closeModal, customClass, whichIcon }: IModal) => {
  // const showHideClassName = show ? "block" : "hidden";
  return (
    <>
      {show ?
      <div className={`w-screen h-screen bg-modal fixed top-0 left-0`}>
        <div
          className={`bg-white rounded-12t fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 boder border-solid border-secondary_fill p-24t w-11/12 mx-auto md:max-w-1/3 lg:max-w-[541px] ${customClass}`}>
          {whichIcon === "return"
            ? <div className='flex justify-start items-center cursor-pointer mb-24t' onClick={closeModal}><ArrowLeft className='fill-third w-[17px] h-[17px] mr-[4px]' /><span className="text-third text-mid font-normal">Retour</span></div>
            : <div className='flex justify-end cursor-pointer'><Cross onClick={closeModal} className='fill-third' /></div>}
          {children}
        </div>
      </div>
      : null
      }
    </>
  );
}

export default Modal;
