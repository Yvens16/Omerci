import React, { useEffect,useRef } from 'react';
import Cross from '../../public/icons/menu/close_big.svg';


interface ModalParams {
  children: React.ReactNode,
  show: boolean,
  closeModal: (whenOpeningOnly?:boolean) => void,
  titleHtml: React.ReactNode,
}

const Modal = ({ children, show = false, closeModal, titleHtml }: ModalParams) => {
  const showHideClassName = show ? "block" : "hidden";
  const selectRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: any) => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });
  return (
    <div className={`w-screen h-screen bg-modal fixed top-0 left-0 ${showHideClassName}`}>
      <div
        ref={selectRef}
        className='bg-white rounded-12t fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 boder border-solid border-secondary_fill w-11/12 mx-auto md:max-w-1/3 lg:max-w-[541px]'>
        <div className='flex justify-between bg-secondary_fill p-16t rounded-t-12t'>
          <h3 className='text-black font-medium text-18t'>{titleHtml}</h3>
          <Cross onClick={() => closeModal()} className='fill-third cursor-pointer self-center' />
        </div>
        <div className='p-24t'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;