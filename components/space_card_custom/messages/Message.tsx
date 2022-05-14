import React from "react";
// import IMessage from '../interfaces';
import Button from "@components/buttons/Button";
import ShapeIcon from '../../../public/icons/basic/shape.svg'
import TrashIcon from '../../../public/icons/basic/trash_full.svg'
import Image from 'next/image';
import MoreIcon from '../../../public/icons/menu/more_horizontal.svg'
import { IMessage } from '../interfaces';
import { howLongAgo } from "@components/utils/dateUtils";

/**
 * 
 * @param editRight 
 * canModifyAndDelete
 * canDelete
 * participant: nothing 
 */

const Message = ({ mediaUrl, editRight, ownerName, createdDate, message, toggleModal, toggleDeleteModal }: IMessage) => {
  return <div data-testid="message-card" className={`xl:max-w-[417px] flex flex-col text-center border border-solid border-dashed_third rounded-12t`}>
    <div className="header flex justify-between mb-32t px-24t pt-24t">
      <div className="left flex items-center">
        <div className="text-white font-semibold text-12t flex items-center justify-center circle bg-gradient-to-br from-[#E2415E] to-[#E241DC] rounded-[50%] w-[32px] h-[32px] mr-8t">HO</div>
        <div className="b flex flex-col text-left font-medium">
          <p className='text-14t'>{ownerName}</p>
          <p className="text-12t text-[#B4B2BB]">{howLongAgo(createdDate)}</p>
        </div>
      </div>
      {editRight === "modifyAndDelete"
        && <Button testId="more_icon" myClass={'max-w-[40px] h-[40px] !p-8t !bg-white !border-[#BDBDBD]'} handleClick={toggleModal} type={'secondary'} size={''}>
          <MoreIcon className="fill-third w-[24px] h-[24px]" />
        </Button>}
      {editRight === "delete"
        && <Button testId="trash_icon" myClass={'max-w-[40px] h-[40px] !p-8t !bg-white !border-[#BDBDBD]'} handleClick={toggleDeleteModal} type={'secondary'} size={''}>
          <TrashIcon className="fill-third w-[24px] h-[24px]" />
        </Button>}
      {/* {editRight === "nothing"
        && null} */}
    </div>
    <div className="mb-24t w-[90%] md:max-w-[369px] h-auto mx-auto">
    {/* width={369} height={295} */}
      {/* <Image className="rounded-12t" width="100%" height="100%" src={mediaUrl} layout='responsive' objectFit="cover" alt="gif" /> */}
      <img className="h-auto rounded-12t mx-auto" src={mediaUrl} alt="my gif" />
    </div>
    <p className="p-24t leading-[25px] text-medium text-14t text-third">{message}</p>
  </div>
}


export default Message;