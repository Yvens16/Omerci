import React, { useState } from 'react';
import ChatIcon from '../../public/icons/communication/chat.svg';
import BillIcon from '../../public/icons/bills.svg';
import MoreIcon from '../../public/icons/menu/more_horizontal.svg';
import Options from '@components/personal_space/Options';

type TCards = {
  cards: {
    photoUrl: string,
    title: string,
    creationDate: string,
    recipientName: string,
    messageNumber: number,
    money: number,
    url: string,
    isSent: boolean,
  }[],
  sectionName: string,
  activeIndex: number | null,
  toggleOption: (id: number) => void,
  mobileOption: React.ReactNode,
  desktopOption: React.ReactNode,
  sent: boolean,
}
const Cards = ({ cards, sectionName, activeIndex, toggleOption, mobileOption, desktopOption, sent }: TCards) => {
  return (
    <div className='px-16t xl:px-0 bg-default_bg mb-40t'>
      <div className='mb-16t'><h3 className='font-semibold text-18t'>{sectionName}</h3></div>
      <div className='flex lg:flex-wrap hide-scrollbar'> {/** lg:show-scrollbar */}
        {cards.filter(card => card.isSent === sent).map((card, id) => (
          <div className={`${id === activeIndex ? "z-10" : ""} relative carte card_box_shadow lg:mb-16t mr-16t rounded-12t bg-white border border-solid min-w-[235px] drop-shadow-[0_5px_12px_rgba(0,0,0,0.05)] border-secondary_fill`} key={id}>
            {sectionName === "Envoyées au destinataire"
              ? <div className='w-full h-full absolute bg-white opacity-50 top-0 left-0'></div>
              : null}
            <div className='flex flex-col items-center p-24t'>
              <div className='mb-8t bg-gradient-to-b from-gradient1 to-gradient2	border border-solid border-white  w-[62px] h-[62px] rounded-16t bg-primary flex justify-center items-center text-white text-[20px] font-semibold'>
                {"Yvens"?.toUpperCase().split('')[0]}{"Belaston"?.toUpperCase().split('')[0]}
              </div>
              <div onClick={() => toggleOption(id)} className={`${activeIndex === id ? "border border-primary" : ""} lg:card_settings absolute top-0 right-0 mr-24t mt-24t w-32t h-32t p-8t rounded-8t bg-secondary_fill flex justify-center items-center`}>
                <div>
                  <MoreIcon className='fill-primary cursor-pointer' />
                </div>
              </div>
              <span className="text-mid font-medium">{card.title}</span>
              <span className='text-12t font-light'>Pour Yvens Belaston</span>
            </div>
            <div className='flex justify-center pb-24t'>
              <div className='bg-default_bg rounded-8t  p-16t flex justify-center items-center mr-24t'>
                <div className='flex items-center'>
                  <div className='w-16t h-16t mr-1'>
                    <ChatIcon />
                  </div>
                  <span className='text-12t font-normal'>32</span>
                </div>n
              </div>
              <div className='bg-default_bg rounded-8t  p-16t flex justify-center items-center'>
                <div className='flex items-center'>
                  <div className='w-16t h-16t mr-1'>
                    <BillIcon />
                  </div>
                  <span className='text-12t font-normal'>26 €</span>
                </div>
              </div>
            </div>
            {id === activeIndex ? desktopOption : null}
          </div>
        ))}
      </div>
      {mobileOption}
    </div>
  );
}

export default Cards;