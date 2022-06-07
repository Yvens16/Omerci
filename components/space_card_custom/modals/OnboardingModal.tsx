import React from 'react'
import Button from '@components/buttons/Button';
import Image from 'next/image';
import ChatIcon from '../../../public/icons/communication/chat.svg';
import BillIcon from '../../../public/icons/bills.svg';
import MessageIcon from "../../../public/icons/communication/message.svg";
import SendIcon from "../../../public/icons/communication/Send.svg";
import CalendarIcon from "../../../public/icons/calendar/calendar.svg";
import SimpleModal from "@components/modal/SimpleModal";
import { IOnboardingModal } from '@components/space_card_custom/interfaces';


function OnboardingModal({ show, closeModal, cardTitle, numberOfMsg, moneyCount, cardCreator, isAdmin, photoUrl, recipientName }: IOnboardingModal) {
  return (
    <SimpleModal show={show} closeModal={closeModal} titleHtml={undefined}>
      <div className="add-scrollbar h-[526px] flex flex-col items-center text-center">
        <span className="mb-8t text-[29px]" >👋</span>
        <h3 className='text-18t text-black font-semibold mb-8t'>Bienvenue dans la carte virtuelle {cardTitle || "titre"}</h3>
        <p className='mb-32t text-14t font-medium text-third'>Vous avez été invitez à participez une carte virtuelle crée par {cardCreator || "name of creator"} </p>
        <div className='p-24t flex flex-col items-center rounded-12t border border-solid border-secondary_fill shadow-card_box_shadow mb-24t md:flex-row md:items-center w-full'>
          <div className='mb-8t w-[62px] h-[62px] relative rounded-16t md:mr-8t md:mb-0 md:min-w-[62px]'>
            <Image className={`img_avatar`} src={photoUrl || '/avatars/cat.svg'} alt={`avatar}`} layout="fill" objectFit="cover" />
            <style jsx global>{`
    .img_avatar {
      border-radius: 16px;
    }
  `}</style>
          </div>
          <div className='text-black mb-24t md:mb-0 md:mr-24t'>
            <p className='text-mid font-medium whitespace-nowrap'>{cardTitle || "Ce n’est qu’un aurevoir"}</p>
            <p className='text-12t'>Pour {recipientName || "une belle personne"}</p>
          </div>
          <div className='flex justify-between items-center w-full'>
            <div className='p-16t md:p-8t bg-default_bg rounded-8t mr-24t flex items-center justify-center flex-1'>
              <ChatIcon className='mr-4t' />
              <span>{numberOfMsg || 0}</span>
            </div>
            <div className='p-16t md:p-8t bg-default_bg rounded-8t flex items-center justify-center text-black whitespace-nowrap flex-1'>
              <BillIcon className='mr-4t' />
              <span>{moneyCount || 0} €</span>
            </div>
          </div>
        </div>
        <div className="shadow-card_box_shadow  text-black text-left w-full md:border md:border-solid md:border-input_default md:rounded-12t mb-32t md:p-24t">
          <div className='border border-solid border-input_default md:border-none mb-16t p-16t rounded-12t md:flex md:items-center'>
            <div className="rounded-[50%] bg-primary md:min-w-[32px] w-[32px] h-[32px] flex items-center justify-center mb-8t md:mr-16t">
              <MessageIcon className="fill-white w-[18px] h-[18px]" />
            </div>
            <div>
              <p className='text-mid font-semibold'>Ajouter votre message</p>
              <p className='text-14t'>Ajouter votre message original ! Du texte , un gif et c’est parti !</p>
            </div>
          </div>
          {isAdmin &&
            <div className='border border-solid border-input_default md:border-none my-16t p-16t rounded-12t md:flex md:items-center'>
              {/* Cette div entière à partir de ligne 61 jusqu'à 68 if isAdmin condition show if not don't show*/}
              <div className="rounded-[50%] bg-primary md:min-w-[32px] w-[32px] h-[32px] flex items-center justify-center mb-8t md:mb-0 md:mr-16t">
                <CalendarIcon className="fill-white w-[18px] h-[18px]" />
              </div>
              <div>
                <p className='text-mid font-semibold'>Fixer une date de fin</p>
                <p className='text-14t'>Envoyez le lien aux participant pour qu’il puissent écrire leur message</p>
              </div>
            </div>
          }
          <div className='border border-solid border-input_default md:border-none my-16t p-16t rounded-12t md:flex md:items-center'>
            <div className="rounded-[50%] bg-primary md:min-w-[32px] w-[32px] h-[32px] flex items-center justify-center mb-8t md:mb-0 md:mr-16t">
              <SendIcon className="fill-white w-[18px] h-[18px]" />
            </div>
            <div>
              <p className='text-mid font-semibold'>Partagez le lien de la carte à d’autre participants</p>
              <p className='text-14t'>Copier le lien de partage et partager le facilement à tous ceux qui veulent participer</p>
            </div>
          </div>
        </div>
        <div>
          <Button myClass={''} handleClick={closeModal} type='primary' size='big'>
            Compris
          </Button>
        </div>
      </div>
    </SimpleModal>

  )
}

export default OnboardingModal