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
  const { getCard, getMessagesOnCard, deleteMessage, updateCard } = useFirestoreDb();
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
    router.push("/create_message")
  }

  /** ######## Messages ######## */
  const { execute: executeGetMessages, status: messagesStatus, value: messages, error: messagesError } = useAsync(getMessagesOnCard, false, cardId);
  /** ######## Messages ######## */

  /** ######## ModifyAndDeleteMessage ######## */
  const deleteSelectedMessage = async (messageId: string) => {
    await deleteMessage(messageId);
    toggleDeleteModal();
    executeGetMessages;
  }
  const modifyMessage = (messageId: string) => {
    router.push({
      pathname: `/create_card/[pid]?modify=true`,
      query: { pid: messageId }
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

  const toggleDeleteModal = () => {
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
    const showTheOnboardingModal = async() => {
      if (authUser && authUser["uid"] && card) {
        if (!card.WhoHasAlreadySeenOnce.includes(authUser["uid"])) {
          setShowOnboardingModal(true)
          await updateCard({...card, userId: authUser["uid"], cardId: card.uid})
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

  /** ######## ONBOARDING MODAL ######## */
  return (
    <div className=" lg:max-w-[1240px] mx-auto">
      <div className="py-8t bg-white md:!bg-default_bg md:my-24t px-16t xl:px-0 mb-16t xl:my-24t">
        <Header />
      </div>
      <div className='px-16t xl:px-0 xl:grid xl:grid-cols-[30%_70%]'>
      {/* <CardParams teamName={"card.teamName"} goToCreateMessage={goToCreateMessage} isAdmin={isAdmin} photoUrl={'/avatars/girl.jpg'} backgroundUrl={"'/images/card_params_bg.jpg'"}
          cardTitle={"card.cardTitle"} receiverName={"card.recipientName"} messageNumber={12} moneyCount={13} /> */}
        {cardStatus === "success" && <CardParams teamName={card.teamName} goToCreateMessage={goToCreateMessage} isAdmin={isAdmin} photoUrl={card.photoUrl || '/avatars/girl.jpg'} backgroundUrl={"'/images/card_params_bg.jpg'"}
          cardTitle={card.cardTitle} receiverName={card.recipientName} messageNumber={card.messageNumber} moneyCount={card.moneyCount} />}
        {cardStatus === "error" && <div className="bg-danger text-white mb-36t flex flex-col xl:max-w-[350px] h-max">
          <div className={`card mb-24t bg-cover p-24t rounded-12t`}>
            Il y{"'"} a une erreur:<br></br>{cardError.message}
          </div>
        </div>}
        <div>
          <div className='flex items-center mb-16t'>
            <h2 className='text-title font-semibold min-w-fit mr-16t'>Tous les messages</h2>
            <hr className='w-full block border border-solid border-input_default' />
          </div>
          <div className='mobile_view new_message md:hidden'>
          <div className='mb-24t'>
            <AddNewMessage goToCreateMessage={goToCreateMessage} />
          </div>
            {messagesStatus === "success" && messages.length && messages.map((message: any, idx: any) => (
              <div key={idx} className="mb-24t md:mr-8t">
                <Message message={message.messageText} toggleDeleteModal={() => toggleDeleteModal()} toggleModal={() => toggleMobileOptionModal(message.uid)} messageId={message.uid} mediaUrl={message.mediaUrl} editRight={getEditRight(authUser!["uid"], message["creatorId"], card["creatorId"])} ownerName={message.ownerName} createdDate={message.createdDate}></Message>
              </div>
            ))}
          </div>
          <div className={`desktop_view colum_grid hidden md:grid ${messagesStatus === "success" && messages.length < 2 ? "md:flex md:flex-col": "md:grid-cols-[1fr_1fr] md:gap-24t"}`}>
            <div className={`col_left ${messagesStatus === "success" && messages.length < 2 ? "lg:flex lg:flex-row-reverse lg:justify-between": ""}`}>
              <div className='mb-24t'>
                <AddNewMessage goToCreateMessage={goToCreateMessage} />
              </div>
              {messagesStatus === "success" && messages.length > 0 && pair(messages).map((message: any, idx: any) => (
                <div key={idx} className="mb-24t md:mr-8t">
                  <Message message={message.messageText} toggleDeleteModal={() => toggleDeleteModal()} toggleModal={() => toggleDesktopOptionModal(message.uid)} messageId={message.uid} mediaUrl={message.mediaUrl} editRight={getEditRight(authUser!["uid"], message["creatorId"], card["creatorId"])} ownerName={message.ownerName} createdDate={message.createdDate}></Message>
                  {showDesktopOption && selectedMessageId === message.uid
                    && <DesktopOption toggleDeleteModal={() => toggleDeleteModal()} modifyMessage={() => modifyMessage(selectedMessageId)} />}
                </div>
              ))}
            </div>
            <div className="col_right">
              {messagesStatus === "success" && messages.length > 0 && impair(messages).map((message: any, idx: number) => (
                <div key={idx} className="mb-24t md:mr-8t">
                  <Message message={message.messageText} toggleDeleteModal={() => toggleDeleteModal()} toggleModal={() => toggleDesktopOptionModal(message.uid)} messageId={message.uid} mediaUrl={message.mediaUrl} editRight={getEditRight(authUser!["uid"], message["creatorId"], card["creatorId"])} ownerName={message.ownerName} createdDate={message.createdDate}></Message>
                  {showDesktopOption && selectedMessageId === message.uid
                    && <DesktopOption toggleDeleteModal={() => toggleDeleteModal()} modifyMessage={() => modifyMessage(selectedMessageId)} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {cardStatus === "success" && showOnboardingModal
        && <OnboardingModal recipientName={card.recipientName} photoUrl={card.photoUrl} cardCreator={card.creatorName} cardTitle={card.title}
          numberOfMsg={0} moneyCount={0} isAdmin={isAdmin} show={showOnboardingModal}
          closeModal={closeOnboardingModal} titleHtml={undefined} />
      }
      {showMobileOption && <MobileOption modifyMessage={() => modifyMessage(selectedMessageId)} toggleDeleteModal={() => toggleDeleteModal()} />}
      {showDeleteModal && <DeleteMessageModal deleteMessage={() => deleteSelectedMessage(selectedMessageId)} show={showDeleteModal} closeModal={toggleDeleteModal}/>}
    </div>
  )
}

export default CardPage;