import React, { useRef } from 'react'
import ChevronIcon from "../../../public/icons/arrow/chevron_big_left.svg";
import ShortArrowLeftIcon from "../../../public/icons/arrow/short_left.svg";
import Button from '@components/buttons/Button';
import { Header as Interface } from '../interfaces';

function Header({title, handleback, subtitle, buttonContent}: Interface) {
  const returnRef = useRef(null);
  return (
    <div className='lg:bg-white'>
      <div className='flex items-baseline mt-32t lg:mt-0 mb-24t xl:w-[687px]  xl:max-w-laptopContent xl:mx-auto 2xl:max-w-content relative'>
        <ChevronIcon onClick={handleback} className="fill-primary stroke-primary stroke-[2px] mr-16t xl:hidden"/>
        <div className="hidden xl:block xl:absolute xl:-left-[237px] top-12t" ref={returnRef}>
          <Button myClass="text-primary" handleClick={handleback} type="third" size="big" >
          <ShortArrowLeftIcon className="w-[17px] h-[17px] fill-primary mr-8t"/>
          <span>{buttonContent}</span>
          </Button>
        </div>
        <div className="header_container lg:my-24t">
          <h2 className='text-black text-title font-semibold'>{title}</h2>
          <span className="text-third text-mid">{subtitle}</span>
        </div>
      </div>
    </div>
  )
}

export default Header;