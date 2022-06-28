import React from "react";
import Image from 'next/image';
import { IParams } from '../interfaces';
import SettingsIcon from "../../../public/icons/basic/settings_filled.svg";
import BillIcon from '../../../public/icons/bills.svg';
import ChatIcon from '../../../public/icons/communication/chat.svg';
import MessageIcon from "../../../public/icons/basic/mail.svg";
import MessageAltIcon from "../../../public/icons/communication/message_plus_alt.svg";
import ShareIcon from "../../../public/icons/basic/share_outline.svg"
import MoreIcon from '../../../public/icons/menu/more_horizontal.svg';
import Button from "../../buttons/Button";
import { useRouter } from 'next/router';


const CardParams = ({ isAdmin, backgroundUrl, photoUrl, cardTitle, teamName, receiverName, messageNumber, moneyCount, goToCreateMessage, toggleParamsModal }: IParams) => {
  const router = useRouter();
  const { isrecipient } = router.query;
  return <div className="mb-36t flex flex-col xl:max-w-[350px] h-max">
    <div className={`card mb-24t bg-cover p-24t rounded-12t`}>
      <div className="flex justify-between items-center mb-8t">
        <div className='mb-8t w-[55px] h-[55px] relative rounded-16t md:mr-8t md:mb-0 md:min-w-[55px]'>
          <Image className={`img_avatar`} src={photoUrl} alt={`avatar}`} layout="fill" objectFit="cover" />
        </div>
        {isAdmin
          ? <div onClick={toggleParamsModal} className="w-[40px] h-[40px] bg-secondary_fill p-8t rounded-8t cursor-pointer">
            <SettingsIcon data-testid="settings" className="w-[24px] h-[24px] fill-primary" />
          </div>
          : null}
      </div>
      <div className="texte text-mid text-white mb-16t">
        <p className="font-semibold">{cardTitle}</p>
        <p className="">{receiverName}</p>
        {isrecipient === "true" ? <p>De la part de : {teamName}</p> : null}
      </div>
      <div className='flex justify-between items-center w-full text-white max-w-[50%]'>
        <div className='p-8t bg-iconsParams backdrop-blur-[44px] rounded-8t mr-12t flex items-center justify-center flex-1'>
          <ChatIcon className='mr-4t fill-white' />
          <span>{messageNumber || 0}</span>
        </div>
        <div className='p-8t bg-iconsParams backdrop-blur-[44px] rounded-8t flex items-center justify-center  whitespace-nowrap flex-1'>
          <BillIcon className='mr-4t fill-white' />
          <span>{moneyCount || 0} €</span>
        </div>
      </div>
    </div>
    {isrecipient === "true" ? <>
      <Button myClass={"mb-12t"} handleClick={() => router.push("/respond")} type={"primary"} size={"big"}>
        <MessageAltIcon className="fill-white w-[24px] h-[24px] mr-10t" />
        Répondre à tous
      </Button>
      <Button myClass={"bg-white text-primary"} handleClick={function (): void {
        throw new Error("Function not implemented.");
      }} type={"secondary"} size={"big"}>
        <MoreIcon className="fill-primary w-[24px] h-[24px] mr-10t" />
        <span className="text-mid text-primary">Autre options</span>
      </Button>
    </> : <>
      <Button myClass={"mb-12t"} handleClick={goToCreateMessage} type={"primary"} size={"big"}>
        <MessageIcon className="fill-white w-[24px] h-[24px] mr-10t" />
        Ajouter un message
      </Button>
      <Button myClass={"bg-white text-primary"} handleClick={function (): void {
        throw new Error("Function not implemented.");
      }} type={"secondary"} size={"big"}>
        <ShareIcon className="fill-primary w-[24px] h-[24px] mr-10t" />
        <span className="text-mid text-primary">Inviter des participants</span>
      </Button>
    </>}

    <style jsx global>{`
    .img_avatar {
      border-radius: 50%;
    }
    .card {
      background-image: url(${backgroundUrl})
    }
  `}</style>
  </div>
}

export default CardParams;