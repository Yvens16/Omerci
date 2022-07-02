import React from 'react'
import CircleChevron from "../../../public/icons/circle_arrow.svg"
import Input from '@components/inputs/Input'
import { IInfo } from '../interfaces'

function Information({ handleInfo, messageCreatorInfo }: IInfo) {
  console.log('messageCreatorInfo:', messageCreatorInfo)
  return (
    <div className='bg-white rounded-8t border border-solid border-secondary_fill p-16t xl:max-w-laptopContent xl:mx-auto'>
      <div className="header flex items-center mb-24t">
        <CircleChevron className="fill-primary w-[14px] h-[14px] mr-8t" />
        <h4 className='text-primary text-mid font-medium'>Vos informations</h4>
      </div>
      <div className="inputs text-14t text-black md:flex justify-between">
        <div className="md:basis-1/4">
          <Input value={messageCreatorInfo.name} label={'Prénom'} placeholder={'Jean'} handleChange={handleInfo} name={'name'} infoMessage={''}></Input></div>
        <div className="md:basis-1/4 md:mx-8t">
          <Input value={messageCreatorInfo.familyName} label={'Nom'} placeholder={'Dujardin'} handleChange={handleInfo} name={'familyName'} infoMessage={''}></Input></div>
        <div className="md:basis-2/4">
          <Input value={messageCreatorInfo.email} label={'Adresse Email'} placeholder={'jeandujardin@gmail.com'} handleChange={handleInfo} name={'email'} infoMessage={''}></Input></div>
      </div>
    </div>
  )
}

export default Information