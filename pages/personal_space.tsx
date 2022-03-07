/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef, useEffect } from 'react';
import type { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import { useOnClickOutside } from '@components/utils/hooks/useClickOutside';
import { useAsync } from '@components/utils/hooks/useAsync';
import { useFirestoreDb } from 'context/FirestoreContext';
import { useAuth } from 'context/AuthUserContext';
import Header from "@components/personal_space/Header";
import Cards from '@components/personal_space/Cards';
import Options from '@components/personal_space/Options';
// import { cardsData as cardsValues } from '@components/utils/mockData/Cards';
import Modal from '@components/modal/Modal';
import Trash from '../public/icons/basic/trash_full.svg';
import Button from '@components/buttons/Button';
import EmptyCard from '@components/personal_space/EmptyCard';
import { avatars } from '@components/personal_space/utilities';


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
  const { deleteCardInDB, getCards } = useFirestoreDb();
  const { authUser } = useAuth();
  let { status, value: cardsValues, error } = useAsync(getCards, true, [authUser && authUser["uid"] ? authUser['uid'] : ""]);
  const [cardsData, setCardsData] = useState<any>([]);
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
  useOnClickOutside(modalRef, () => closeDeleteModal());

  const ref = useRef<HTMLDivElement>(null);
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  useOnClickOutside(ref, () => setIsOptionOpen(false));

  const [url, setUrl] = useState<string>("");
  const [cardUidToDelete, setCardUidToDelete] = useState<string | null>(null);

  function closeOption() {
    setIsOptionOpen(false);
    setSentIsOptionOpen(false)
    setActiveIndex(null);
    setSentActiveIndex(null);
  }

  const copyToClipBoard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    closeOption()
    // TODO: add a snackbar here
  }

  const toggleOptionModal = (id: number | null) => {
    // TODO: set uid to delete
    const cards = cardsData.filter((card: { isSent: boolean; }) => card.isSent == false);
    if (id != null && id > -1) {
      const card = cards[id];
      setCardUidToDelete(card.uid);
      if (card.url) setUrl(card.url);
      setActiveIndex(id);
    }
    setIsOptionOpen(!isOptionOpen);
  };

  const toggleSentOptionModal = (id: number | null) => {
    const cards = cardsData.filter((card: { isSent: boolean; }) => card.isSent == true);
    if (id != null && id > -1) {
      const card = cards[id];
      setCardUidToDelete(card.uid);
      if (card.url) setUrl(card.url);
      setSentActiveIndex(id);
    }
    setSentIsOptionOpen(!isSentOptionOpen);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
    closeOption();
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  }

  const deleteCard = (uid: string) => {
    let newCardsData = cardsData.filter((card: any) => card.uid !== uid);
    deleteCardInDB(uid);
    setCardsData(newCardsData);
    closeDeleteModal();
  }

  useEffect(() => {
    if (cardsValues?.length) {
      cardsValues.map((card: any) => {
        if (!card.photoUrl.length) card.photoUrl = `${avatars[Math.floor(Math.random() * avatars.length)]}`;
      })
      setCardsData(cardsValues)
    };
  }, [cardsValues])

  return (
    <div className="text-black">
      <Header firstName="Fadel" lastName="Belaston" />
      {/* TODO: Add loader when status pending  */}
      {status === "idle" && <div>idle</div>}
      {status === "error" && <div>
        <h1 className='text-danger'>Il y'a une erreur envoyer un whatsapp à Yvens, avec l'erreur ci-dessous pour débugger plus facilment</h1>
        <span>{error}</span>
      </div>}
      {status === "success"
        && <div className='xl:mx-auto xl:max-w-[1240px]'>
          {cardsData.length < 1
            ? <EmptyCard imgLink='/emptyCard.svg' text="Vous n'avez pas encore de carte crée" addNewCard={function (): void | Promise<void> {
              throw new Error('Function not implemented.');
            }} />
            : <>
              <Cards
                sent={false}
                desktopOption={<Options copyToClipBoard={copyToClipBoard} openDeleteModal={openDeleteModal} isMobile={false} url={url} optionRef={desktopOptionRef} customClass={`lg:absolute ${activeIndex != null ? activeIndex % 4 === 0 ? "lg:top-[24%] lg:-right-[140%]" : "lg:top-[24%] lg:right-[10%]" : ""}`} />}

                mobileOption={<Options copyToClipBoard={copyToClipBoard} openDeleteModal={openDeleteModal} isMobile={true} closeOption={toggleOptionModal} url={url} optionRef={ref} customClass={`${isOptionOpen ? "" : "hidden"}`} />}
                toggleOption={toggleOptionModal} activeIndex={activeIndex} cards={cardsData} sectionName="Actifs"
              />
              <Cards sent={true} cards={cardsData} sectionName="Envoyées au destinataire" activeIndex={activeSentdIndex} toggleOption={toggleSentOptionModal}
                desktopOption={<Options copyToClipBoard={copyToClipBoard} openDeleteModal={openDeleteModal} isMobile={false} url={url} optionRef={desktopSentOptionRef} customClass={`lg:absolute ${activeSentdIndex != null ? activeSentdIndex % 4 === 0 ? "lg:top-[24%] lg:-right-[140%]" : "lg:top-[24%] lg:right-[10%]" : ""}`} />}
                mobileOption={<Options copyToClipBoard={copyToClipBoard} openDeleteModal={openDeleteModal} isMobile={true} closeOption={toggleSentOptionModal} url={url} optionRef={sentRef} customClass={`${isSentOptionOpen ? "" : "hidden"}`} />}
              />
            </>}
        </div>}
      <Modal show={isDeleteModalOpen} closeModal={function (): void {
        throw new Error('Function not implemented.');
      }}>
        <div ref={modalRef} className="flex flex-col items-center">
          <div className='logo mt-32t mb-16t'><Trash className="fill-danger" /></div>
          <h3 className='text-black font-semibold text-18t text-center mb-8t'>Êtes-vous sûr de vouloir supprimer cet carte ? </h3>
          <p className='text-base text-center text-third mt-16t mb-40t'>En supprimant cet carte, vous perdrez tous son contenu, et ni vous ni les participants ne pourront y acceder</p>
          <div className="flex justify-between">
            <Button myClass='secondary mr-8t' handleClick={closeDeleteModal} type='secondary' size='big'>Annuler</Button>
            <Button myClass='text-white bg-danger rounded-8t' handleClick={() => deleteCard(cardUidToDelete!)} type='primamry' size='big'>Supprimer</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PersonalSpace;

// creationDate
// 24 janvier 2022 à 00:21:27 UTC+1
// (horodatage)
// creatorId
// ""
// hasCagnotte
// false
// isPremium
// false
// isSent
// true
// photoUrl
// "/avatars/girl.jpg"
// recipientName
// "Gueye Fadel"
// teamName
// "yolo"
// title
// "Wesh la tess"
// uid
// "F9on2PtYc9QF5KoprNW3"
// url
// "false_url"