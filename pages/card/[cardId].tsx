import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Header from '@components/space_card_custom/header/Header';
import Message from '@components/space_card_custom/messages/Message';
import CardParams from '@components/space_card_custom/card_params/CardParams';
import AddNewMessage from '@components/space_card_custom/messages/AddNewMessage';
import { useFirestoreDb } from '../../context/FirestoreContext';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useAsync } from '@components/utils/hooks/useAsync';
import { IOnboardingModal } from '@components/space_card_custom/interfaces';
import { useAuth } from '../../context/AuthUserContext';
import MobileOption from '@components/space_card_custom/card_options/MobileOption';
import DesktopOption from '@components/space_card_custom/card_options/Option';
import DeleteMessageModal from '@components/space_card_custom/params_modal/DeleteMessageModal';
import ParamsModale from "@components/space_card_custom/params_modal/Modal";
import { useOnClickOutside } from '@components/utils/hooks/useClickOutside';

const OnboardingModal = dynamic<IOnboardingModal>(() => import('@components/space_card_custom/modals/OnboardingModal'))

const pair = (messages: string[]) => messages.filter((el, idx) => idx % 2 === 0);
const impair = (messages: string[]) => messages.filter((el, idx) => idx % 2 !== 0);

const getEditRight = (userUid: string, messageCreatorId: string, cardCreatorId: string) => {
  // Admin peut supprimer mais pas modifier les autres messages et peut supprimer et modifier son message
  // Participant peut modifier et supprimer son msg, peut rien faire sur les autres messages
  // Admin if cardCreatorId === userUid
  // Participant if userUid === messageUid
  const isAdmin = userUid === cardCreatorId;
  const ownMessage = userUid === messageCreatorId;
  if (isAdmin && !ownMessage) return "delete";
  if (ownMessage) return "modifyAndDelete";
  return "";

}

const CardPage: NextPage = () => {
  const DesktopOptionRef = useRef<HTMLDivElement | null>(null);
  const MobileOptionRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(DesktopOptionRef, () => setShowDesktopOption(false))
  useOnClickOutside(MobileOptionRef, () => setShowMobileOption(false))
  const { getCard, getMessagesOnCard, deleteMessage, updateCard, updateCardParams } = useFirestoreDb();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const { authUser } = useAuth();
  /** ######## CARD ######## */
  const { cardId } = router.query
  const { execute: executeGetCard, status: cardStatus, value: card, error: cardError } = useAsync(getCard, true, cardId);
  /** ######## CARD ######## */

  /** ######## ONBOARDING MODAL ######## */
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const closeOnboardingModal = () => {
    setShowOnboardingModal(false);
  };

  const goToCreateMessage = () => {
    router.push({
      pathname: "/create_message",
      query: { carteid: cardId, cardTitle: card.title }
    })
  }

  /** ######## Messages ######## */
  const { execute: executeGetMessages, status: messagesStatus, value: messages, error: messagesError } = useAsync(getMessagesOnCard, false, cardId);
  /** ######## Messages ######## */

  /** ######## ModifyAndDeleteMessage ######## */
  const deleteSelectedMessage = async (messageId: string) => {
    await deleteMessage(messageId);
    toggleDeleteModal(messageId);
    await executeGetMessages();
  }
  const modifyMessage = (messageId: string) => {
    router.push({
      pathname: `/create_message`,
      query: { pid: messageId, modify:true }
    });
  }
  /** ######## ModifyAndDeleteMessage ######## */

  /** ######## MobileOption ######## */
  const [showMobileOption, setShowMobileOption] = useState(false);
  const [showDesktopOption, setShowDesktopOption] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleMobileOptionModal = (messageId: any) => {
    setShowMobileOption((prevState) => {
      prevState ? setSelectedMessageId(messageId) : setSelectedMessageId(messageId);
      return !prevState;
    });
  }

  /** ######## MobileOption ######## */


  /** ######## DesktopOPtion ######## */
  const toggleDesktopOptionModal = (messageId: any) => {
    setShowDesktopOption((prevState) => {
      prevState ? setSelectedMessageId(messageId) : setSelectedMessageId(messageId);
      return !prevState;
    });
  }

  /** ######## DeleteModale ######## */

  const toggleDeleteModal = (messageId: string) => {
    setSelectedMessageId(messageId);
    setShowDeleteModal((prevState) => {
      return !prevState;
    })
  }
  /** ######## DeleteModale ######## */


  /** ######## DesktopOPtion ######## */
  useEffect(() => {
    if (cardStatus === "success") {
      const getMessage = async () => {
        await executeGetMessages();
      }
      getMessage();
    }
  }, [executeGetMessages, cardStatus, cardId])
  useEffect(() => {
    const showTheOnboardingModal = async () => {
      if (authUser && authUser["uid"] && card) {
        if (!card.WhoHasAlreadySeenOnce.includes(authUser["uid"])) {
          setShowOnboardingModal(true)
          await updateCard({ ...card, userId: authUser["uid"], cardId: card.uid })
          //TODO: API call to add userUid to WhoHasAlreadySeenOnce array
          //TODO: Make send message icon the right size
        };
      }
    }
    const checkIfUserIsAdmin = () => {
      if (authUser && authUser["uid"] && card && authUser["uid"] === card.creatorId) {
        setIsAdmin(true);
      }
    }
    checkIfUserIsAdmin();
    showTheOnboardingModal();
  }, [authUser, card, updateCard])

  /** ######## option modal ######## */
  const [showParamsModal, setShowParamsModal] = useState(false);
  const toggleParamsModal = () => {
    setShowParamsModal((prevState) => {
      return !prevState;
    })
  }

  const paramsInitialValues = {
    title: (card && card.title) || "",
    recipientName: (card && card.recipientName) || "",
    teamName: (card && card.teamName) || "",
    hasCagnotte: (card && card.hasCagnotte) || false,
    uid: (card && card.uid) || "",
    photoUrl: (card && card.photUrl) || ""
  }

  const reset = () => {
    setValues({
      ...paramsInitialValues,
    });
  }

  const [values, setValues] = useState(paramsInitialValues);
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value, checked, id } = e.target;
    // const dateSelects = ["day", "month", "year"];
    // if (id && dateSelects.includes(id)) {
    //   setValues((prevState) => ({
    //     ...prevState,
    //     [name]: name === "hasCagnotte" ? checked : value,
    //   }))
    // }
    setValues((prevState) => ({
      ...prevState,
      [name]: name === "hasCagnotte" ? checked : value,
    }))
  }

  const initialDates = {
    day: "",
    month: "",
    year: ""
  }

  const [dates, setDates] = useState(initialDates);
  const handleSelectChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { textContent, id } = e.target;
    setDates((prevState) => ({
      ...prevState,
      [id]: textContent,
    }))
  }

  const [selectedPhotoFile, setSelectedPhotoFile] = useState(undefined);
  const [fileUrlToShow, setFileToShowURL] = useState("");
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const updateCardP = async () => {
    if (authUser && authUser["uid"] && card) {
      const { title, teamName, recipientName, hasCagnotte, uid } = values;
      if (selectedPhotoFile) {
        await updateCardParams({ title, teamName, recipientName, hasCagnotte, cardId: uid, file: selectedPhotoFile });
      } else {
        await updateCardParams({ title, teamName, recipientName, hasCagnotte, cardId: uid });
      }
      setCardUpdate(!cardUpdate);
      setShowParamsModal(!showParamsModal);
    }
  }

  const handlePhotoCLick = () => hiddenFileInput.current?.click();
  const fileChange = (e: any) => {
    setSelectedPhotoFile(e.target.files[0]);
    if (e.target.files[0].type.includes("image")) setFileToShowURL(URL.createObjectURL(e.target.files[0]));
  }
  /** ######## option modal ######## */

  useEffect(() => {
    setValues({
      ...card,
    })
  }, [card])
  const [cardUpdate, setCardUpdate] = useState(false);
  useEffect(() => {
    executeGetCard();
  }, [cardUpdate])



  return (
    <div className=" lg:max-w-[1240px] mx-auto relative">
      <div className="py-8t bg-white md:!bg-default_bg md:my-24t px-16t xl:px-0 mb-16t xl:my-24t">
        <Header goTo={() => router.push({ pathname: "/send_card", query: { cardTitle: card.title, recipient: card.recipientName, cardId: card.uid } })} goBack={() => router.push({ pathname: "/personal_space" })} isAdmin={isAdmin} />
      </div>
      <div className='px-16t xl:px-0 xl:flex xl:gap-x-[32px]'>
        {/* <CardParams teamName={"card.teamName"} goToCreateMessage={goToCreateMessage} isAdmin={isAdmin} photoUrl={'/avatars/girl.jpg'} backgroundUrl={"'/images/card_params_bg.jpg'"}
          cardTitle={"card.cardTitle"} receiverName={"card.recipientName"} messageNumber={12} moneyCount={13} /> */}
        {cardStatus === "success" && console.log("11111", card)}
        {cardStatus === "success" && messagesStatus === "success" && <CardParams toggleParamsModal={toggleParamsModal} teamName={card.teamName} goToCreateMessage={goToCreateMessage} isAdmin={isAdmin} photoUrl={card.photoUrl || '/avatars/girl.jpg'} backgroundUrl={"'/images/card_params_bg.jpg'"}
          cardTitle={card.title} receiverName={card.recipientName} messageNumber={messages.length} moneyCount={card.moneyCount} />}
        {cardStatus === "error" && <div className="bg-danger text-white mb-36t flex flex-col xl:max-w-[350px] h-max">
          <div className={`card mb-24t bg-cover p-24t rounded-12t`}>
            Il y{"'"} a une erreur:<br></br>{cardError.message}
          </div>
        </div>}
        <div className="xl:grow">
          <div className='flex items-center mb-16t'>
            <h2 className='text-title font-medium min-w-fit mr-16t'>Tous les messages</h2>
            <hr className='w-full block border border-solid border-input_default opacity-50' />
          </div>
          <div className='mobile_view new_message md:hidden'>
            {cardStatus === "success" && messagesStatus === "success" && messages.length ? messages.map((message: any, idx: any) => (
              <div key={idx} className="mb-24t md:mr-8t">
                <Message
                  message={message.messageContent}
                  toggleDeleteModal={() => toggleDeleteModal(message.uid)}
                  toggleModal={() => toggleMobileOptionModal(message.uid)}
                  messageId={message.uid} media={message.media}
                  editRight={getEditRight(authUser!["uid"], message["creatorId"], card["creatorId"])}
                  owner={message.creator} createdDate={message.createdDate}></Message>
              </div>
            )) : null}
            <div className='mb-24t'>
              <AddNewMessage goToCreateMessage={goToCreateMessage} />
            </div>
          </div>
          <div className={`desktop_view colum_grid hidden md:grid ${messagesStatus === "success" && messages.length < 2 ? "md:flex md:flex-col" : "md:grid-cols-[1fr_1fr] md:gap-24t"}`}>
            <div className={`col_left ${messagesStatus === "success" && messages.length < 2 ? "xl:flex xl:flex-row xl:grow xl:gap-x-24t" : ""}`}>
              {cardStatus === "success" && messagesStatus === "success" && messages.length > 0 && pair(messages).map((message: any, idx: any) => (
                <div key={idx} className="mb-24t xl:min-w-[369px]">
                  <Message showDesktopOption={showDesktopOption} message={message.messageContent} toggleDeleteModal={() => toggleDeleteModal(message.uid)} toggleModal={() => toggleDesktopOptionModal(message.uid)} messageId={message.uid} media={message.media} editRight={getEditRight(authUser!["uid"], message["creatorId"], card["creatorId"])} owner={message.creator} createdDate={message.createdDate}>
                    <>
                      {showDesktopOption && selectedMessageId === message.uid
                        && <DesktopOption ref={DesktopOptionRef} toggleDeleteModal={() => toggleDeleteModal(message.uid)} modifyMessage={() => modifyMessage(selectedMessageId)} />}
                    </>
                  </Message>
                </div>
              ))}
              <div className='mb-24t'>
                <AddNewMessage goToCreateMessage={goToCreateMessage} />
              </div>
            </div>
            <div className="col_right">
              {cardStatus === "success" && messagesStatus === "success" && messages.length > 0 && impair(messages).map((message: any, idx: number) => (
                <div key={idx} className="mb-24t md:mr-8t">
                  <Message showDesktopOption={showDesktopOption} message={message.messageContent} toggleDeleteModal={() => toggleDeleteModal(message.uid)} toggleModal={() => toggleDesktopOptionModal(message.uid)} messageId={message.uid} media={message.media} editRight={getEditRight(authUser!["uid"], message["creatorId"], card["creatorId"])} owner={message.creator} createdDate={message.createdDate}>
                    <>
                      {showDesktopOption && selectedMessageId === message.uid
                        && <DesktopOption ref={DesktopOptionRef} toggleDeleteModal={() => toggleDeleteModal(message.uid)} modifyMessage={() => modifyMessage(selectedMessageId)} />}
                    </>
                  </Message>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {cardStatus === "success" && messagesStatus === "success" && showOnboardingModal
        && <OnboardingModal customClass="xl:top-[88px] xl:-translate-y-0" recipientName={card.recipientName} photoUrl={card.photoUrl} cardCreator={card.creatorName} cardTitle={card.title}
          numberOfMsg={messages.length} moneyCount={0} isAdmin={isAdmin} show={showOnboardingModal}
          closeModal={closeOnboardingModal} titleHtml={undefined} />
      }
      {showMobileOption && <MobileOption ref={MobileOptionRef} modifyMessage={() => modifyMessage(selectedMessageId)} toggleDeleteModal={() => toggleDeleteModal(selectedMessageId)} />}
      {showDeleteModal && <DeleteMessageModal deleteMessage={() => deleteSelectedMessage(selectedMessageId)} show={showDeleteModal} closeModal={toggleDeleteModal} />}
      {showParamsModal && cardStatus == "success" && <ParamsModale cancel={reset} validate={updateCardP} selectedPhotoFile={fileUrlToShow} dates={dates} values={values} handleChangeInput={handleInputChange} show={showParamsModal} closeModal={toggleParamsModal} photoUrl={card.photoUrl}
        backgrounds={[]} cardTitle={card.title} receiverName={card.recipientName} teamName={card.teamName} expirationDay={''}
        expirationMonth={''} expirationYear={''} handleSelectChange={handleSelectChange} handlePhotoCLick={handlePhotoCLick} fileChange={fileChange} ref={hiddenFileInput} />}
    </div>
  )
}

export default CardPage;