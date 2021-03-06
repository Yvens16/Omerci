import React, { useEffect,useRef } from 'react';
import { IInfoModal } from './interfaces';

const SimpleModal = ({ customClass, children, show = false, closeModal, titleHtml,blurClass}: IInfoModal) => {
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
    <div className={`w-screen h-screen bg-modal fixed top-0 left-0 ${showHideClassName} ${blurClass}`}>
      {console.log("customClass", customClass)}
      <div
        ref={selectRef}
        className={`p-16t bg-white rounded-12t fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 boder border-solid border-secondary_fill w-11/12 mx-auto md:max-w-1/3 lg:max-w-[541px] ${customClass}`}>
        <div className=''>
          {children}
        </div>
      </div>
    </div>
  );
}

export default SimpleModal;