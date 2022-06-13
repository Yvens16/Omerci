import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { NextPage } from "next";
import { IGif } from "@giphy/js-types";
import { useRouter } from 'next/router';
import { IHeader, IMessageCreation } from "@components/create_msg/interfaces";
import { ICagnotte } from '@components/create_msg/cagnotte/interfaces';
import { useFirestoreDb } from '../context/FirestoreContext';
import Button from '@components/buttons/Button';
import { useOnClickOutside } from '@components/utils/hooks/useClickOutside';
import { useAuth } from '../context/AuthUserContext';
import useSWR from 'swr'
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
let environment = process.env.NEXT_PUBLIC_VERCEL_ENV;
let stripekey = environment === "development" ? process.env.NEXT_PUBLIC_STRIPE_SECRET_PUBLIC_TEST : process.env.NEXT_PUBLIC_STRIPE_SECRET_PUBLIC;
const stripePromise = loadStripe(stripekey!);



const Header = dynamic<IHeader>(() => import("@components/create_msg/header/Header"));
const MessageCreation = dynamic<IMessageCreation>(() => import("@components/create_msg/createMessage/CreateMessage"));
const Infos = dynamic(() => import("@components/create_msg/Infos/Information"));
const Cagnotte = dynamic<ICagnotte>(() => (import("@components/create_msg/cagnotte/Cagnotte")).then((mod) => mod.Cagnotte));
const GifyModal = dynamic(() => import('@components/create_msg/media_search/GifySearch'));
const UnsplashModal = dynamic(() => import('@components/create_msg/media_search/UnpslashSearch'));


const CreateMessage: NextPage = () => {
  const router = useRouter();
  console.log(router.query, "@@@@@@@@@@@")
  const [stripeMessage, setMessage] = useState(null);
  const [stripeIsLoading, setStripeIsLoading] = useState(false);

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
  const [isAmountSelected, setIsAmountSelected] = useState<boolean>(false);
  const [selectedFile, setFiles] = useState<File>();
  const [fileUrlToShow, setFileToShowURL] = useState({ type: "", url: "" });
  const [showView, setShowView] = useState<"default" | "gify" | "unsplash">("default");
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const MediasModalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(MediasModalRef, () => setShowView("default"));
  const { createMessage } = useFirestoreDb();

  const handleInfo = (e: any) => {
    const { name, value } = e.target;
    setInfo({
      ...messageCreatorInfo,
      [name]: value
    })

  }
  const onFileChange = (e: any) => {
    setGifUrl("");
    setUnsplashUrl("");
    setFiles(e.target.files[0])
    const selectedFile: File = e.target.files[0];
    console.log('selectedFile:', selectedFile)
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
    const cardId = router.query.carteid as string;
    if (selectedFile) {
      const fileType: any = selectedFile.type.split("/")[0];
      await createMessage({ cardId, file: selectedFile, docName: selectedFile.name, docType: fileType, creatorId: "1234", message: messageContent, creator: messageCreatorInfo });
    } else if (unsplashUrl !== "" || gifUrl !== "") await createMessage({ cardId, docType: unsplashUrl.length ? "image" : "gif", creatorId: "1234", message: messageContent, mediaUrl: unsplashUrl.length ? unsplashUrl : gifUrl, creator: messageCreatorInfo })
    router.push(`card/${cardId}`)
  }
  const reset = () => {
    setInfo({ name: "", familyName: "", email: "" })
    setMessageContent("");
    setGifUrl("");
    setUnsplashUrl("");
    setCagnotteAmount(0);
    setIsAmountSelected(false);
    setFiles(undefined);
    setFileToShowURL({  type:"", url:"" });
    setIsCustomAmount(false);
    // router.push(`/card/${router.query.carteid}`);
  }

  const handleMessage = (e: any) => {
    setMessageContent(e.target.value);
  }

  const handleCagnotteAmount = (e: any | number) => {
    if (!isAmountSelected) setIsAmountSelected(true);
    const amount = e && e.target ? e.target.value : e;
    setCagnotteAmount(Number(amount));
  }

  const handleCustomAmount = () => {
    setIsCustomAmount(true);
  }

  const deleteMediaState = () => {
    setGifUrl("");
    setUnsplashUrl("");
    setFiles(undefined);
    setFileToShowURL({ type: "", url: "" });
  }

  const fetcher = (url: string) => fetch(url, {
    method: "POST",
    body: JSON.stringify({ amount: 1400 })
  }).then((res) => {
    return res.json();
  })
  const { data, error } = useSWR('/api/pay_card', fetcher)
  const options = {
    // passing the client secret obtained from the server
    clientSecret: data && data.clientSecret ? data.clientSecret : "",
  };
  const backToCard = () => {
    router.push(`/card/${router.query.carteid}`);
  }

  return (
    <>
      <div className="px-16t xl:px-0">
        <Header backToCard={backToCard}/>
        <div className='mb-24t'>
          <MessageCreation fileUrlToShow={fileUrlToShow} deleteMediaState={deleteMediaState} fileChange={onFileChange} showWhichView={showWhichView} handleMessage={handleMessage} messageContent={messageContent} mediaUrl={unsplashUrl.length ? unsplashUrl : gifUrl} />
        </div>
        <div className='mb-24t'>
          <Infos handleInfo={handleInfo} messageCreatorInfo={messageCreatorInfo} />
        </div>
        <div className='mb-40t'>
          {data && data.clientSecret &&
            <Cagnotte
              stripePromise={stripePromise}
              cagnotteAmount={cagnotteAmount}
              handleCustomAmount={handleCustomAmount}
              stripeOption={options}
              handleCagnotteAmount={handleCagnotteAmount}
              isCustomAmount={isCustomAmount}
              isAmountSelected={isAmountSelected}
              onFileUpload={onFileUpload}
              clientSecret={data.clientSecret}
              commissionValue={0}
              reset={reset}
            />
          }
        </div>
        {/* <div className="buttons flex justify-between mb-12t xl:max-w-laptopContent xl:mx-auto 2xl:max-w-content">
            <Button myClass={'mr-12t'} handleClick={function (): void {
              throw new Error('Function not implemented.');
            }} type={'secondary'} size={'big'}>Annuler</Button>
            <Button myClass={''} handleClick={onFileUpload} type={'primary'} size={'big'}>Ajouter le message</Button>
          </div> */}
      </div>
      {showView === "gify" && <GifyModal mediaRef={MediasModalRef} showModal={true} onClose={() => showWhichView("default")} selectGif={selectGif} />}
      {showView === "unsplash" && <UnsplashModal mediaRef={MediasModalRef} showModal={true} onClose={() => showWhichView("default")} selectPhoto={selectPhoto} />}
    </>
  )
}

export default CreateMessage;