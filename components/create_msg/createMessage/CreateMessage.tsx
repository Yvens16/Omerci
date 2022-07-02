/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Button from '@components/buttons/Button';
import ChatIcon from "../../../public/icons/communication/message_plus_alt.svg";
import ImageIcon from "../../../public/icons/basic/image.svg";
import FolderOpenIcon from "../../../public/icons/misc/folder_open.svg";
import TrashIcon from '../../../public/icons/basic/trash_full.svg'

import { IMessageCreation } from '../interfaces';

function CreateMessage({ fileChange, showWhichView, handleMessage, messageContent, mediaUrl, deleteMediaState, fileUrlToShow }: IMessageCreation) {
  return (
    <div className='container xl:max-w-laptopContent xl:mx-auto'>
      <div className="message bg-primary border border-secondary_fill border-solid rounded-12t p-24t">
        <div className="icon_title flex items-center mb-24t">
          <div className='rounded-8t mr-8t lg:mr-16t p-12t bg-msgHug w-[44px]'>
            <ChatIcon className="fill-white w-[24px]" />
          </div>
          <h4 className='text-white text-mid font-semibold'>Votre message</h4>
        </div>
        <textarea onChange={handleMessage} value={messageContent} rows={5} className='outline-none overflow-hidden resize-none w-full bg-primary border-b border-b-[#A78DE9] border-solid text-18t text-white mb-24t' name="" id="" placeholder="Tapez votre message..."></textarea>
        {fileUrlToShow && fileUrlToShow.type === "video" &&
          <div className='relative rounded-8t xl:w-[420px] xl:m-auto'>
            <video src={fileUrlToShow.url} autoPlay className='w-full rounded-8t' />
            <Button myClass={'absolute right-0 top-[50%] flex-none !p-8t !w-[48px] h-[48px] from_unsplash mx-12t bg-secondary_fill p-8t rounded-8t flex items-center justify-center text-mid text-primary font-semibold'} handleClick={deleteMediaState} type={''} size={''}><TrashIcon className="fill-primary w-[24px] h-[24px]" /></Button>
          </div>}
        {fileUrlToShow && fileUrlToShow.type === "image" && <div className='relative rounded-8t xl:w-[420px] xl:m-auto'>
          <img src={fileUrlToShow.url} alt="media à afficher" className='w-full rounded-8t' />
          <Button myClass={'absolute right-0 top-[50%] flex-none !p-8t !w-[48px] h-[48px] from_unsplash mx-12t bg-secondary_fill p-8t rounded-8t flex items-center justify-center text-mid text-primary font-semibold'} handleClick={deleteMediaState} type={''} size={''}><TrashIcon className="fill-primary w-[24px] h-[24px]" /></Button>
        </div>}
        {mediaUrl !== "" &&
          <div className='relative rounded-8t xl:w-[420px] xl:m-auto'>
            <img src={mediaUrl} alt="media à afficher" className='w-full rounded-8t' />
            <Button myClass={'absolute right-0 top-[50%] flex-none !p-8t !w-[48px] h-[48px] from_unsplash mx-12t bg-secondary_fill p-8t rounded-8t flex items-center justify-center text-mid text-primary font-semibold'} handleClick={deleteMediaState} type={''} size={''}><TrashIcon className="fill-primary w-[24px] h-[24px]" /></Button>
          </div>}
        {(fileUrlToShow.type === "" && mediaUrl === "") && <div className="medias flex w-[70%] lg:w-[20%]">
          <Button myClass='flex-none !p-8t !w-[48px] h-[48px] from_gify bg-secondary_fill p-8t rounded-8t flex items-center justify-center text-mid text-primary font-semibold' handleClick={() => showWhichView("gify")} type={''} size={''} >GIF</Button>
          <Button testId='unsplashSearch' myClass='flex-none !p-8t !w-[48px] h-[48px] from_unsplash mx-24t bg-secondary_fill p-8t rounded-8t flex items-center justify-center text-mid text-primary font-semibold' handleClick={() => showWhichView("unsplash")} type={''} size={''}>
            <ImageIcon className="fill-primary w-[24px]" />
          </Button>
          <label htmlFor="docs" className="cursor-pointer w-[48px] h-[48px] from_device bg-secondary_fill p-8t rounded-8t flex items-center justify-center text-mid text-primary font-semibold">
            <FolderOpenIcon className="fill-primary w-[20px] h-[17px]" />
            <input className='hidden' type="file" name="docs" id="docs" onChange={fileChange} />
          </label>
        </div>}
      </div>
    </div>
  )
}

export default CreateMessage;