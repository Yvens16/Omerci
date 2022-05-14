import React from 'react'
import { IShareLinkModal } from '../interfaces';
import SimpleModal from '@components/modal/SimpleModal';
import Button from '@components/buttons/Button';
import CloseIcon from '../../../public/icons/menu/close_big.svg'
function Modal({ url, show, closeModal }: IShareLinkModal) {
  const copyToClipBoard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
  }
  return (
    <SimpleModal show={show} closeModal={closeModal} titleHtml={undefined}>
      <>
        <div className="header flex justify-between mb-16t">
          <h3 className="text-medium text-18t">Votre lien de partage</h3>
          <CloseIcon className='fill-third' onClick={closeModal}/>
        </div>
        <div className="body mb-32t">
          <input value={url} type="text" className="text-input_placeholder text-ellipsis text-14t w-full rounded-8t my-4t border border-solid border-input_default p-8t" placeholder={url} />
        </div>
        <div>
          <Button myClass={'min-w-full'} handleClick={() => copyToClipBoard(url)} type={'primary'} size={'big'}>Copier le lien</Button>
        </div>
      </>


    </SimpleModal>
  )
}

export default Modal;