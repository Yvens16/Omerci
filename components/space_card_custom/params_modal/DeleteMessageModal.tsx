import React from 'react'
import SimpleModal from '@components/modal/SimpleModal';
import TrashIcon from "../../../public/icons/basic/trash_full.svg"
import CloseIcon from "../../../public/icons/menu/close_big.svg";
import Button from '@components/buttons/Button';

function DeleteMessageModal({ show, deleteMessage, closeModal }: any) {
  return (
    <SimpleModal customClass='' show={show} closeModal={closeModal} titleHtml={undefined}>
      <div className="flex flex-col items-center">
        <div className='flex justify-end w-full mb-16t cursor-pointer' onClick={closeModal}><CloseIcon className="fill-third"/></div>
        <TrashIcon className="fill-danger w-[36px] h-[36px] mb-24t" />
        <h2 className="mb-8t text-22t text-semibold">Êtes-vous sûr de vouloir supprimer ce message ?</h2>
        <p className='mb-40t text-14t text-medium text-third'>Cette action est définitive...</p>
        <div className='flex w-full'>
          <Button myClass={'mr-16t'} handleClick={closeModal} type={'secondary'} size={'big'}>Annuler</Button>
          <Button myClass={'!bg-danger'} handleClick={deleteMessage} type={'primary'} size={'big'}>Supprimer</Button>
        </div>
      </div>
    </SimpleModal>
  )
}

export default DeleteMessageModal;