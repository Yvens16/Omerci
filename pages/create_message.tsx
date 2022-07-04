import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { NextPage } from "next";
import { IGif } from "@giphy/js-types";
import { useRouter } from 'next/router';
import { IHeader, IInfo, IMessageCreation } from "@components/create_msg/interfaces";
import { ICagnotte } from '@components/create_msg/cagnotte/interfaces';
import { useFirestoreDb } from '../context/FirestoreContext';
import Button from '@components/buttons/Button';
import Portal from '@components/Portal';
import { useOnClickOutside } from '@components/utils/hooks/useClickOutside';
import { useAuth } from '../context/AuthUserContext';
import useSWR from 'swr'
import { useAsync } from '@components/utils/hooks/useAsync';

// import {
//   PaymentElement,
//   useStripe,
//   useElements
// } from "@stripe/react-stripe-js";
// import { loadStripe } from '@stripe/stripe-js';
// let environment = process.env.NEXT_PUBLIC_VERCEL_ENV;
// let stripekey = environment === "development" ? process.env.NEXT_PUBLIC_STRIPE_SECRET_PUBLIC_TEST : process.env.NEXT_PUBLIC_STRIPE_SECRET_PUBLIC;
// const stripePromise = loadStripe(stripekey!);


const Header = dynamic(() => import("@components/reusables/header/Header"));
const MessageCreation = dynamic<IMessageCreation>(() => import("@components/create_msg/createMessage/CreateMessage"));
const Infos = dynamic<IInfo>(() => import("@components/create_msg/Infos/Information"));
const Cagnotte = dynamic<ICagnotte>(() => (import("@components/create_msg/cagnotte/Cagnotte")).then((mod) => mod.Cagnotte));
const GifyModal = dynamic(() => import('@components/create_msg/media_search/GifySearch'));
const UnsplashModal = dynamic(() => import('@components/create_msg/media_search/UnpslashSearch'));


const CreateMessage: NextPage = () => {
  const router = useRouter();
  const { pid: messageId, modify } = router.query;
  const [stripeMessage, setMessage] = useState(null);
  const [stripeIsLoading, setStripeIsLoading] = useState(false);
  const [isOkBtnDisabled, setIsOkBtnDisabled] = useState(true);

  const initialBtns = {
    five: false,
    ten: false,
    twenty: false,
  }

  const [isBtnSelected, setIsBtnSelected] = useState<{ [key: string]: boolean }>(initialBtns)

  const { authUser } = useAuth();
  const [messageCreatorInfo, setInfo] = useState<{ name: string, familyName: string, email: string }>({
    name: "",
    familyName: "",
    email: "",
  });
  const [messageContent, setMessageContent] = useState<string>("");
  const [gifUrl, setGifUrl] = useState<string>("");
  const [unsplashUrl, setUnsplashUrl] = useState<string>("");
  const [cagnotteAmount, setCagnotteAmount] = useState<number>(0);
  //TODO: add cagnotte amout to call && create function to update message
  const [isAmountSelected, setIsAmountSelected] = useState<boolean>(false);
  const [selectedFile, setFiles] = useState<File>();
  const [fileUrlToShow, setFileToShowURL] = useState({ type: "", url: "" });
  const [showView, setShowView] = useState<"default" | "gify" | "unsplash">("default");
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const MediasModalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(MediasModalRef, () => setShowView("default"));
  const { createMessage, getSingleMessage, modifyMessage } = useFirestoreDb();


  const handleInfo = (e: any) => {
    const { name, value } = e.target;
    setInfo({
      ...messageCreatorInfo,
      [name]: value
    })

  }


  useEffect(() => {
    const checkDisabledBtn = () => {
      let disableInfoState = false;
      Object.values(messageCreatorInfo).map(prop => {
        if (prop.length === 0) disableInfoState = true;
      })
      if (isCustomAmount) {
        if (Number(cagnotteAmount) > 0 && messageContent.length !== 0 && disableInfoState === false) {
          setIsOkBtnDisabled(false);
        } else {
          setIsOkBtnDisabled(true);
        }
      } else {
        if (isCustomAmount === false && messageContent.length !== 0 && disableInfoState === false) {
          setIsOkBtnDisabled(false);
        }
      }

    }
    checkDisabledBtn();
  }, [messageContent, messageCreatorInfo, isCustomAmount, cagnotteAmount])
  const { execute: executeGetSingleMessage, status: messagesStatus, value: singleMessage, error: messagesError } = useAsync(getSingleMessage, false, messageId);

  useEffect(() => {
    const getMessageInfo = async () => {
      await executeGetSingleMessage();
    }
    if (messageId && messageId.length > 0) {
      getMessageInfo();
    }
  }, [messageId, executeGetSingleMessage, router])

  const setContentTodata = () => {
    if (messagesStatus === "success") {
      const { name, familyName, email } = singleMessage.creator;
      setMessageContent(singleMessage.messageContent);
      setInfo({ name, familyName, email });
      if (singleMessage.media.type === "gif") setGifUrl(singleMessage.media.url)
      else if (singleMessage.media.type === "unsplash") setUnsplashUrl(singleMessage.media.url)
      else setFileToShowURL({type: singleMessage.media.type , url:singleMessage.media.url});
    }
  }
  useEffect(() => {
    setContentTodata();
  }, [messagesStatus])

  const onFileChange = (e: any) => {
    setGifUrl("");
    setUnsplashUrl("");
    setFiles(e.target.files[0])
    const selectedFile: File = e.target.files[0];
    if (selectedFile.type.includes("image")) setFileToShowURL({ type: "image", url: URL.createObjectURL(e.target.files[0]) });
    if (selectedFile.type.includes("video") || selectedFile.type.includes("audio")) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = URL.createObjectURL(selectedFile);
      video.onloadedmetadata = () => {
        // Duration of the video|audio is only available here
        window.URL.revokeObjectURL(video.src);
        console.log("Duration : " + video.duration + " seconds");
        if (video.duration < 120) setFileToShowURL({ type: "video", url: URL.createObjectURL(e.target.files[0]) })
        else console.log("File too big"); // TODO: ADD SNACKBAR
      }
    }
  }

  const showWhichView = (view: "default" | "gify" | "unsplash") => {
    setShowView(view);
  }
  const selectGif = (gifUrl: string) => {
    setGifUrl(gifUrl);
    showWhichView("default");
  }

  const selectPhoto = (unsplashUrl: string) => {
    setUnsplashUrl(unsplashUrl);
    showWhichView("default");
  }

  const onFileUpload = async () => {
    const cardId = router.query.cardId as string;
    if (router.query.modify) {
      if (selectedFile) {
        const fileType: any = selectedFile.type.split("/")[0];
        await modifyMessage({ messageId: messageId as string, cardId, file: selectedFile, docName: selectedFile.name, docType: fileType, creatorId: authUser?.["uid"] as string, message: messageContent, creator: messageCreatorInfo, cagnotteAmount });
      } else if (unsplashUrl !== "" || gifUrl !== "") await modifyMessage({ messageId: messageId as string, cardId, docType: unsplashUrl.length ? "image" : "gif", creatorId: authUser?.["uid"] as string, message: messageContent, mediaUrl: unsplashUrl.length ? unsplashUrl : gifUrl, creator: messageCreatorInfo, cagnotteAmount })
    } else {
      if (selectedFile) {
        const fileType: any = selectedFile.type.split("/")[0];
        await createMessage({ cardId, file: selectedFile, docName: selectedFile.name, docType: fileType, creatorId: authUser?.["uid"] as string, message: messageContent, creator: messageCreatorInfo, cagnotteAmount });
      } else if (unsplashUrl !== "" || gifUrl !== "") await createMessage({ cardId, docType: unsplashUrl.length ? "image" : "gif", creatorId: authUser?.["uid"] as string, message: messageContent, mediaUrl: unsplashUrl.length ? unsplashUrl : gifUrl, creator: messageCreatorInfo, cagnotteAmount })
    }
    router.push(`card/${cardId}`)
  }
  const reset = () => {
    if (modify) {
      setContentTodata();
    } else {
      setInfo({ name: "", familyName: "", email: "" })
      setMessageContent("");
      setGifUrl("");
      setUnsplashUrl("");
      setCagnotteAmount(0);
      setIsAmountSelected(false);
      setFiles(undefined);
      setFileToShowURL({ type: "", url: "" });
      setIsCustomAmount(false);
      setIsBtnSelected(initialBtns);
    }
    // router.push(`/card/${router.query.carteid}`);
  }

  const handleMessage = (e: any) => {
    setMessageContent(e.target.value);
  }

  const handleCagnotteAmount = (e: any | number) => {
    const dicAmount: { [key: number]: string } = { 5: "five", 10: "ten", 20: "twenty" };
    if (typeof e === "number") {
      const newState: { [key: string]: boolean } = { ...initialBtns };
      newState[dicAmount[e]] = true;
      setIsBtnSelected(newState);
    }

    if (!isAmountSelected) setIsAmountSelected(true);
    const amount = e && e.target ? e.target.value : e;
    setCagnotteAmount(Number(amount));
  }

  const handleCustomAmount = () => {
    setIsCustomAmount(true);
    setIsBtnSelected(initialBtns);
  }

  const deleteMediaState = () => {
    setGifUrl("");
    setUnsplashUrl("");
    setFiles(undefined);
    setFileToShowURL({ type: "", url: "" });
  }

  // const fetcher = (url: string) => fetch(url, {
  //   method: "POST",
  //   body: JSON.stringify({ amount: 1400 })
  // }).then((res) => {
  //   return res.json();
  // })
  // const { data, error } = useSWR('/api/pay_card', fetcher)
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: data && data.clientSecret ? data.clientSecret : "",
  // };
  const backToCard = () => {
    router.push(`/card/${router.query.carteid}`);
  }

  return (
    <>
      <div className="px-16t xl:px-0">
        {console.log("gif url", gifUrl)}
        {showView === "gify" &&
          <Portal>
            <GifyModal mediaRef={MediasModalRef} showModal={true} onClose={() => showWhichView("default")} selectGif={selectGif} />
          </Portal>
        }
        {showView === "unsplash" &&
          <Portal>
            <UnsplashModal mediaRef={MediasModalRef} showModal={true} onClose={() => showWhichView("default")} selectPhoto={selectPhoto} />
          </Portal>
        }
        {/* <Header backToCard={backToCard} /> */}
        <Header buttonContent="Retour à la carte" handleback={backToCard} title="Ajouter un message" subtitle={`À la carte ${router.query.cardTitle}`} />
        <div className='mb-24t'>
          <MessageCreation fileUrlToShow={fileUrlToShow} deleteMediaState={deleteMediaState} fileChange={onFileChange} showWhichView={showWhichView} handleMessage={handleMessage} messageContent={messageContent} mediaUrl={unsplashUrl.length ? unsplashUrl : gifUrl} />
        </div>
        <div className='mb-24t'>
          <Infos handleInfo={handleInfo} messageCreatorInfo={messageCreatorInfo} />
        </div>
        <Cagnotte
          isBtnSelected={isBtnSelected}
          // stripePromise={stripePromise}
          cagnotteAmount={cagnotteAmount}
          handleCustomAmount={handleCustomAmount}
          // stripeOption={options}
          handleCagnotteAmount={handleCagnotteAmount}
          isCustomAmount={isCustomAmount}
          isAmountSelected={isAmountSelected}
          onFileUpload={onFileUpload}
          // clientSecret={data.clientSecret}
          commissionValue={0}
          reset={reset}
        />
        {/* <div className='mb-40t'>
          {data && data.clientSecret &&
          }
        </div> */}
        <div className="buttons grid grid-cols-2 mb-12t xl:max-w-laptopContent xl:mx-auto mt-40t">
          <Button myClass={'mr-12t'} handleClick={reset} type={'secondary'} size={'big'}>Annuler</Button>
          {modify ?
            <Button isDisabled={isOkBtnDisabled} myClass={''} handleClick={onFileUpload} type={'primary'} size={'big'}>Modifier le message</Button> :
            <Button isDisabled={isOkBtnDisabled} myClass={''} handleClick={onFileUpload} type={'primary'} size={'big'}>Ajouter le message</Button>
          }

        </div>
      </div>
    </>
  )
}

export default CreateMessage;