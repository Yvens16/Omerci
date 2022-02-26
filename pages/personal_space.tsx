import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import type { NextPage } from 'next'
import { useOnClickOutside } from '@components/utils/hooks/useClickOutside';
import Header from "@components/personal_space/Header";
import Cards from '@components/personal_space/Cards';
import Options from '@components/personal_space/Options';
import { cardsData } from '@components/utils/mockData/Cards';
import Modal from '@components/modal/Modal';
import Trash from '../public/icons/basic/trash_full.svg';
import Button from '@components/buttons/Button';

type TCards = {
  cards: {
    photoUrl: string,
    title: string,
    creationDate: string,
    recipientName: string,
    messageNumber: number,
    money: number,
  }[];
  sectionName: string,
}
const PersonalSpace: NextPage = () => {
  const [cards, setCards] = useState<TCards | null>(null);
  const [OldCards, setOldCards] = useState<TCards | null>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const desktopOptionRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(desktopOptionRef, () => setActiveIndex(null));
  
  
  const [activeSentdIndex, setSentActiveIndex] = useState<number | null>(null);
  const [isSentOptionOpen, setSentIsOptionOpen] = useState<boolean>(false);
  const desktopSentOptionRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(desktopSentOptionRef, () => setSentActiveIndex(null));
  
  const sentRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(sentRef, () => setSentIsOptionOpen(false));
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, () => setIsDeleteModalOpen(false));

  const ref = useRef<HTMLDivElement>(null);
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  useOnClickOutside(ref, () => setIsOptionOpen(false));
  
  const [url, setUrl] = useState<string>("");
  

  const toggleOptionModal = (id: number | null) => {
    // TODO: set uid to delete
    if (id != null && id > -1) {
      const card = cardsData[id];
      if (card.url) setUrl(card.url);
      setActiveIndex(id);
    }
    setIsOptionOpen(!isOptionOpen);
  };

    const toggleSentOptionModal = (id: number | null) => {
    // TODO: set uid to delete
    if (id != null && id > -1) {
      const card = cardsData[id];
      if (card.url) setUrl(card.url);
      setSentActiveIndex(id);
    }
    setSentIsOptionOpen(!isSentOptionOpen);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true)
    setActiveIndex(null);
    setSentActiveIndex(null);
    /**
     * Close OptionModal
     * Supprimer carte soit par batch update ou par single update
     */
  }
  const deleteCard = () => {};

  // const createMultipleRefs = () => {
  //   cardsData.forEach(el => {
  //     let ref 
  //   })
  // }

  return (
    <div className="text-black">
      <Header firstName="Fadel" lastName="Belaston" />
      <div className='xl:mx-auto xl:max-w-[1240px]'>
        <Cards
          sent={false}
          desktopOption={<Options openDeleteModal={openDeleteModal} isMobile={false} url={url} optionRef={desktopOptionRef} customClass={`lg:absolute ${activeIndex != null ? activeIndex % 4 === 0 ? "lg:top-[24%] lg:-right-[140%]" : "lg:top-[24%] lg:right-[10%]" : ""}`} />}

          mobileOption={<Options openDeleteModal={openDeleteModal} isMobile={true} closeOption={toggleOptionModal} url={url} optionRef={ref} customClass={`${isOptionOpen ? "" : "hidden"}`} />}
          toggleOption={toggleOptionModal} activeIndex={activeIndex} cards={cardsData} sectionName="Actifs"
        />
        <Cards sent={true} cards={cardsData} sectionName="Envoyées au destinataire" activeIndex={activeSentdIndex} toggleOption={toggleSentOptionModal}
          desktopOption={<Options openDeleteModal={openDeleteModal} isMobile={false} url={url} optionRef={desktopSentOptionRef} customClass={`lg:absolute ${activeSentdIndex != null ? activeSentdIndex % 4 === 0 ? "lg:top-[24%] lg:-right-[140%]" : "lg:top-[24%] lg:right-[10%]" : ""}`} />}
          mobileOption={<Options openDeleteModal={openDeleteModal} isMobile={true} closeOption={toggleSentOptionModal} url={url} optionRef={sentRef} customClass={`${isSentOptionOpen ? "" : "hidden"}`} />}
        />
      </div>
      <Modal show={isDeleteModalOpen} closeModal={function (): void {
        throw new Error('Function not implemented.');
      }}>
        <div ref={modalRef} className="flex flex-col items-center">
          <div className='logo mt-32t mb-16t'><Trash className="fill-danger" /></div>
          <h3 className='text-black font-semibold text-18t text-center mb-8t'>Êtes-vous sûr de vouloir supprimer cet espace ? </h3>
          <p className='text-base text-center text-third mt-16t mb-40t'>En supprimant cet espace, vous perdrez tous son contenu, et ni vous ni les participants ne pourront y acceder</p>
          <div className="flex justify-between">
            <Button myClass='secondary mr-8t' handleClick={function (): void {
              throw new Error('Function not implemented.');
            }} type='secondary' size='big'>Annuler</Button>
            <Button myClass='text-white bg-danger rounded-8t' handleClick={function (): void {
              throw new Error('Function not implemented.');
            }} type='primamry' size='big'>Supprimer</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PersonalSpace;