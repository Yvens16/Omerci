/* eslint-disable @next/next/no-img-element */
import React from "react";
import Button from "@components/buttons/Button";
import ShapeIcon from '../../../public/icons/basic/shape.svg'
import TrashIcon from '../../../public/icons/basic/trash_full.svg'
import EditIcon from "'../../../public/icons/edit/edit.svg"
import Image from 'next/image';
import MoreIcon from '../../../public/icons/menu/more_horizontal.svg'
import { IMessage } from '../interfaces';
import { howLongAgo } from "@components/utils/dateUtils";
import useFirestore from "../../../firebase/useFirestore";

/**
 * 
 * @param editRight 
 * canModifyAndDelete
 * canDelete
 * participant: nothing 
 */

const Message = ({ media, editRight, owner, createdDate, message, toggleModal, toggleDeleteModal, children, showDesktopOption }: IMessage) => {
  // const { getVideoUrl } = useFirestore();
  return <div data-testid="message-card" className={`relative shadow-message_shadow xl:w-[417px] flex flex-col text-center border border-solid border-message_border rounded-12t bg-white`}>
    <div className="header flex justify-between mb-32t px-24t pt-24t">
      <div className="left flex items-center">
        <div className="text-white font-semibold text-12t flex items-center justify-center circle bg-gradient-to-br from-[#E2415E] to-[#E241DC] rounded-[50%] w-[32px] h-[32px] mr-8t">{owner.familyName.split("")[0].toUpperCase()}{owner.name.split("")[0].toUpperCase()}</div>
        <div className="b flex flex-col text-left font-medium">
          <p className='text-14t'>{owner.name} {owner.familyName}</p>
          <p className="text-12t text-[#B4B2BB]">{howLongAgo(createdDate)}</p>
        </div>
      </div>
      {editRight === "modifyAndDelete"
        && <Button testId="more_icon" myClass={`max-w-[40px] h-[40px] !p-8t !bg-white ${showDesktopOption ? "!border-primary" : "!border-[#BDBDBD]"}`} handleClick={toggleModal} type={'secondary'} size={''}>
          <EditIcon className={`${showDesktopOption ? "fill-primary" : "fill-third"} w-[24px] h-[24px]`} />
        </Button>}
      {editRight === "delete"
        && <Button testId="trash_icon" myClass={'max-w-[40px] h-[40px] !p-8t !bg-white !border-[#BDBDBD]'} handleClick={toggleDeleteModal} type={'secondary'} size={''}>
          <TrashIcon className="fill-third w-[24px] h-[24px]" />
        </Button>}
      {/* {editRight === "nothing"
        && null} */}
    </div>
    <div className="mb-24t w-[90%] md:w-[369px] h-auto mx-auto">
      {/* width={369} height={295} */}
      {/* <Image className="rounded-12t" width="100%" height="100%" src={mediaUrl} layout='responsive' objectFit="cover" alt="gif" /> */}
      {(media.type === "image" || media.type === "gif") && <img className="h-auto rounded-12t mx-auto md:w-[369px]" src={media.url} alt="my gif" />}
      {media.type === "video" && <video className="h-auto rounded-12t mx-auto md:w-[369px]" autoPlay={true} loop muted>
        <source type="video/mp4" src={media.url} />
      </video>}
    </div>
    <p className="p-24t pt-0 leading-[25px] text-medium text-14t text-third text-left">{message}</p>
    <div className="absolute top-[72px] right-[24px]">
      {children}
    </div>
  </div>
}


export default Message;