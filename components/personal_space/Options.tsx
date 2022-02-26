import React from 'react';
import Button from '@components/buttons/Button';
import Input from '@components/inputs/Input';
import ShareIcon from '../../public/icons/basic/share.svg';
import Trash from '../../public/icons/basic/trash_empty.svg';
import Close from '../../public/icons/menu/close_big.svg';
import { useOnClickOutside } from "@components/utils/hooks/useClickOutside";

type TOptions = {
  customClass: string,
  optionRef: React.RefObject<HTMLDivElement>,
  url: string,
  closeOption?: (id: number | null) => void,
  isMobile: boolean,
  openDeleteModal: () => void,
};


const Options = ({ customClass, optionRef, url, closeOption, isMobile, openDeleteModal }: TOptions) => {
  const copyToClipBoard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    // TODO: add a snackbar here
  }
  return <>
    {isMobile ? <div className={`z-50 lg:hidden w-screen h-screen bg-modal fixed top-0 left-0 ${customClass}`}>
      <div ref={optionRef} className={`w-screen fixed bottom-0 left-0 p-16t text-black flex flex-col bg-white border border-solid border-secondary_fill option_box_shadow rounded-t-12t`}>
        <div onClick={() => closeOption && closeOption(null)} className="w-[40px] h-[40px] flex justify-center items-center rounded-8t border border-solid border-primary bg-secondary_fill absolute right-[16px] top-[-48px]">
          <Close className="fill-primary" />
        </div>
        <h3 className='text-mid font-semibold mb-24t'>Autres options</h3>
        <Button myClass='' handleClick={() => copyToClipBoard(url)} type='primary' size=''>
          <ShareIcon className='mr-12t stroke-white fill-primary stroke-[2px]' />
          <span>
            Copier le lien de partage
          </span>
        </Button>
        <div className='text-danger flex justify-center items-center  '>
          <Button myClass='text-danger' handleClick={() => openDeleteModal()} type='third' size=''>
            <Trash className='fill-danger mr-6t' />
            <span>Supprimer cette carte</span></Button>
        </div>
      </div>
    </div> :
      <div ref={optionRef} className={`z-50 hidden lg:flex w-[381px] h-[226px] p-16t text-black  flex-col bg-white border border-solid border-secondary_fill option_box_shadow rounded-12t ${customClass}`}>
        <h3 className='text-mid font-semibold mb-24t'>Autres options</h3>
        <div className='flex mb-8t items-center'>
          <ShareIcon className='mr-12t stroke-third fill-white stroke-[2px]' />
          <span className='text-mid'>Lien de partage</span>
        </div>
        <div className='flex mb-16t items-center'>
          <div className='basis-7/12 mr-8t'>
            <Input isDisabled={true} label='' placeholder={url} handleChange={function (e: any): void {
              throw new Error('Function not implemented.');
            }} infoMessage=''></Input>
          </div>
          <Button myClass='' handleClick={() => copyToClipBoard(url)} type='primary' size=''>Copier le lien</Button>
        </div>
        <hr className='border-t border-t-secondary_fill mb-8t' />
        <div className='text-danger flex justify-center items-center'>
          <Button myClass='text-danger' handleClick={() => openDeleteModal()} type='third' size=''>
            <Trash className='fill-danger mr-4t' />
            Supprimer cette carte</Button>
        </div>
      </div>
    }
  </>
}

export default Options;