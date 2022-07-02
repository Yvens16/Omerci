import React from 'react'
import ChevronLeftIcon from '../../../public/icons/arrow/chevron_thick.svg';
import SendIcon from '../../../public/icons/communication/send_bis.svg'
import ShortArrowIcon from '../../../public/icons/arrow/short_left.svg'
import Button from "@components/buttons/Button"
import { IHeader } from '../interfaces';

function Header({ goTo, goBack, isAdmin }: IHeader) {
  return (
    <div className='navigate flex justify-between items-baseline'>
      <ChevronLeftIcon className='fill-primary md:hidden' />
      <div className="hidden md:block">
        <Button myClass={'text-primary md:!bg-default_bg xl:pl-0'} handleClick={goBack} type='third' size='big'>
          <ShortArrowIcon className="mr-4t w-[17px] h-[17px] fill-primary" />
          Retour à l’accueil
        </Button>
      </div>
      {isAdmin && <Button myClass={'max-w-[193px] !py-8t !px-16t max-w-[300px]'} handleClick={goTo} type='secondary' size='big'> <SendIcon className='fill-primary mr-8t' />Envoyer ou programmer la carte</Button>}
      {/* <div className='hidden xl:block'>
      </div>
      <div className='xl:hidden'>
      </div> */}
    </div>
  )
}

export default Header