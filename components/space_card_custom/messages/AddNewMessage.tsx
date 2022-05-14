import React from 'react'
import Button from "../../buttons/Button";
import ShapeIcon from '../../../public/icons/basic/shape.svg'
import TrashIcon from '../../../public/icons/basic/trash_full.svg'
import Image from 'next/image';
// import IAddNewMessage from '../interfaces';

function AddNewMessage({goToCreateMessage}: {goToCreateMessage: () => void}) {
  return <div className={`lg:max-w-[417px] flex flex-col text-center border border-dashed border-dashed_third rounded-12t h-max p-48t`}>
    <div className="flex justify-center mb-48t">
      <ShapeIcon />
      {/* classame='fill-primary w-[53px] h-[22px]' */}
    </div>
    <h3 className="text-18t font-semibold mb-16t">Ajoutez le premier message </h3>
    <div className='mb-16t'>
      <p className="text-mid font-semibold mb-4t">👋 &nbsp;&nbsp;Soyez créatif et engagé !</p>
      <p className="text-14t font-medium text-third">Vous aussi participez à cet espace .</p>
    </div>
    <Button myClass={''} handleClick={goToCreateMessage} type={'primary'} size={'big'}>Ajouter un message</Button>
  </div>
}

export default AddNewMessage;