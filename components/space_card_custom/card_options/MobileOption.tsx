/* eslint-disable react/display-name */
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}
import Button from '@components/buttons/Button';
import React, {forwardRef, Ref} from 'react'
import TrashIcon from '../../../public/icons/basic/trash_full.svg'
import EditIcon from '../../../public/icons/edit/edit.svg';
import { IOptions } from './interfaces';

const MobileOption = forwardRef(({ modifyMessage,toggleDeleteModal}: IOptions, ref: Ref<HTMLDivElement>) => {
  return (
    <div className='xl:hidden w-screen h-screen bg-modal fixed bottom-0 left-0'>
      <div ref={ref} className="w-full flex flex-col modal absolute bottom-0 p-16t bg-white rounded-tr-12t rounded-tl-12t border border-solid border-secondary_fill">
      <h3 className='mb-24t text-18t font-semibold'>Options</h3>
      <Button myClass={'mb-16t'} handleClick={modifyMessage} type={'primary'} size={'big'}>
        <EditIcon className="fill-white mr-8t w-[24px] h-[24px]"/>
        Modifier mon message</Button>
      <hr className='border border-solid border-secondary_fill mb-16t'/>
      <Button myClass={''} handleClick={toggleDeleteModal} type={'third'} size={'big'}>
        <TrashIcon className="mr-8t fill-danger w-[17px] h-[17px]"/>
        <span className='text-danger'>Supprimer mon message</span></Button>
      </div>
    </div>
  )
})


export default MobileOption;