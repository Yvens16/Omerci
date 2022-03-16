import React from 'react';
import Settings from "../../public/icons/basic/settings.svg"
import CaretDown from "../../public/icons/arrow/caret_down.svg";
import Plus from "../../public/icons/misc/plus.svg";
import Button from '@components/buttons/Button';
import Tabs from '../tabs/Tabs';
import { useRouter } from 'next/router';
// public/icons/basic/settings.svg

type THeader = {
  firstName?: string,
  lastName?: string,
}
const Header = ({ firstName, lastName }: THeader) => {
  const router = useRouter()
  return <div className="bg-white mb-40t">
    <div className="xl:mx-auto xl:max-w-[1240px]">
      <div className="pt-24t pb-[28px] xl:pt-24t xl:pb-32t px-16t xl:px-0 flex lg:justify-between items-center lg:max-w-[343px]">
        <div>
          <div className='bg-gradient-to-b from-gradient1 to-gradient2 w-[48px] h-[48px] rounded-full bg-primary flex justify-center items-center text-white text-[20px] font-semibold'>
            {firstName?.toUpperCase().split('')[0]}{lastName?.toUpperCase().split('')[0]}
          </div>
        </div>
        <h1 className='ml-14t mr-32t lg:mx-0 text-big font-semibold text-black'>Bonjour, {firstName}</h1>
        <div className='flex justify-between ml-auto mr-0 lg:unset_mx'>
          <Settings />
          <CaretDown />
        </div>
      </div>
    </div>
    <div className='px-16t xl:px-0 lg:flex lg:flex-row-reverse lg:items-end lg:justify-between xl:mx-auto xl:max-w-[1240px]'>
      <div className='pb-12t'>
        <Button myClass='mb-24t lg:mb-0 ' handleClick={() => router.push('/create_new_card')} type='primary' size=''>
          <Plus className='fill-white mr-14t' />
          <span className="font-light">Ajouter une carte</span>
        </Button>
      </div>
      <div className='lg:w-[287px] lg:h-[33px]'>
        <Tabs tabs={['Vos cartes', 'Rappel', 'Packs']} whichIndex={function (index: number): {} {
          throw new Error('Function not implemented.');
        }} />
      </div>
    </div>
  </div>
}

export default Header;