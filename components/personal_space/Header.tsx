import React from 'react';
import Settings from "../../public/icons/basic/settings.svg"
import CaretDown from "../../public/icons/arrow/caret_down.svg";
import Plus from "../../public/icons/misc/plus.svg";
import Button from '@components/buttons/Button';
import Tabs from '../tabs/Tabs';
// public/icons/basic/settings.svg

type THeader = {
  firstName?: string,
  lastName?: string,
}
const Header = ({firstName, lastName}: THeader) => {
  return <div className="xl:bg-white">
    <div className="xl:mx-auto xl:max-w-[1240px]">
      <div className="py-24t xl:pt-24t xl:pb-32t px-16t flex justify-between items-center lg:max-w-[343px]">
        <div className='bg-gradient-to-b from-gradient1 to-gradient2	 w-[48px] h-[48px] rounded-full bg-primary flex justify-center items-center text-white text-[20px] font-semibold'>
        {firstName?.toUpperCase().split('')[0]}{lastName?.toUpperCase().split('')[0]}
        </div>
        <h1 className='text-big font-semibold text-black'>Bonjour, {firstName}</h1>
        <div className='flex justify-between'>
          <Settings/>
          <CaretDown/>
        </div>
      </div>
    </div>
    <div className='px-16t lg:flex lg:flex-row-reverse lg:justify-between xl:mx-auto xl:max-w-[1240px]'>
    <Button myClass='mb-24t lg:mb-0 ' handleClick={function () {
      throw new Error('Function not implemented.');
    } } type='primary' size=''>
      <Plus className='fill-white mr-16t'/>
      <span className="font-light">Ajouter un espace</span>
    </Button>
    <div className='lg:w-[287px] lg:h-[33px]'>
      <Tabs tabs={['Vos cartes', 'Rappel', 'Packs']} whichIndex={function (index: number): {} {
        throw new Error('Function not implemented.');
      } }/>
    </div>
    </div>
  </div>
}

export default Header;