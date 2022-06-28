import React from 'react'
import ChevronIcon from "../../../public/icons/arrow/chevron_big_left.svg";
import ShortArrowLeftIcon from "../../../public/icons/arrow/short_left.svg";
import Button from '@components/buttons/Button';
import { IHeader } from '../interfaces';

function Header({ backToCard }: IHeader) {
  return (
    <div className='lg:bg-white'>
      <div className='flex items-baseline mt-32t lg:mt-0 mb-24t  xl:max-w-laptopContent xl:mx-auto 2xl:max-w-content relative'>
        <ChevronIcon  onClick={() => backToCard()} className="fill-primary stroke-primary stroke-[2px] mr-16t xl:hidden"/>
        <div className="hidden xl:block absolute top-12t -left-[200px]">
          <Button myClass="text-primary" handleClick={backToCard} type="third" size="big" >
          <ShortArrowLeftIcon className="w-[17px] h-[17px] fill-primary mr-8t"/>
          <span>Retour à la carte</span>
          </Button>
        </div>
        <div className="header_container lg:my-24t">
          <h2 className='text-black text-title font-semibold'>Ajouter un message</h2>
          <span className="text-third text-mid">A la carte Yvens fairwell</span>
        </div>
      </div>
    </div>
  )
}

export default Header;