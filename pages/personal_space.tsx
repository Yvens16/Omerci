/* eslint-disable react/no-unescaped-entities */
import React, { useState, useRef, useEffect } from 'react';
import type { NextPage } from 'next'
import { useOnClickOutside } from '@components/utils/hooks/useClickOutside';
import { useAsync } from '@components/utils/hooks/useAsync';
import { useFirestoreDb } from '../context/FirestoreContext';
import { useAuth } from '../context/AuthUserContext';
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
  const { deleteCardInDB, getCards, getUserInfo } = useFirestoreDb();
  const { authUser, loading } = useAuth();
  let { execute: loadcardsInfo, status, value: cardsValues, error } = useAsync(getCards, false, authUser && authUser["uid"] ? authUser['uid'] : "");
  let { execute: loadUserInfo, status: statusUserInfo, value: userInfo, error: errUserInfo } = useAsync(getUserInfo, false, authUser && authUser["uid"] ? authUser['uid'] : "");
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
      if (card.cardUrl) setUrl(card.cardUrl);
      setActiveIndex(id);
    }
    setIsOptionOpen(!isOptionOpen);
  };

  const toggleSentOptionModal = (id: number | null) => {
    const cards = cardsData.filter((card: { isSent: boolean; }) => card.isSent == true);
    if (id != null && id > -1) {
      const card = cards[id];
      setCardUidToDelete(card.uid);
      if (card.cardUrl) setUrl(card.cardUrl);
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
    if (authUser && authUser["uid"]) {
      loadUserInfo();
      loadcardsInfo();
    };
  }, [authUser, loadUserInfo, loadcardsInfo])

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
      {authUser && authUser.isAnonymous
        && <div className='bg-primary text-white flex flex-col xl:flex-row justify-center items-center xl:h-[48px]'>
          {/* TODO:  Add functionnality after discussing with Fadel  */}
          <span className="font-medium">Votre adresse email n’est pas encore verifiée.</span> Nous vous avons envoyé un email à l’adresse &nbsp;<span className='font-semibold'>{authUser.email}</span>. &nbsp;<span className='font-light underline'>Revoyez le mail</span>&nbsp; ou &nbsp;<span className='font-light underline'>modifier l’adresse mail</span>
        </div>}
      {statusUserInfo === "success" && <Header firstName={userInfo.firstName} lastName={userInfo.lastName} />}

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
      <Modal customClass='md:w-[477px]' show={isDeleteModalOpen} closeModal={function (): void {
        throw new Error('Function not implemented.');
      }}>
        <div ref={modalRef} className="flex flex-col items-center">
          <div className='logo mt-32t mb-16t'><Trash className="fill-danger w-[36px]" /></div>
          <h3 className='text-black font-semibold text-title text-center mb-8t leading-[32px]'>Êtes-vous sûr de vouloir supprimer cette carte ? </h3>
          <p className='text-base text-center text-third mb-40t leading-[20px]'>En supprimant cette carte, vous perdrez tous son contenu, et ni vous ni les participants ne pourront y acceder</p>
          <div className="flex w-full">
            <Button myClass='grow secondary mr-16t' handleClick={closeDeleteModal} type='secondary' size='big'>Annuler</Button>
            <Button myClass='grow text-white bg-danger rounded-8t' handleClick={() => deleteCard(cardUidToDelete!)} type='primamry' size='big'>Supprimer</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PersonalSpace;