import React from 'react'
import StreamIcon from "../../../public/icons/arrow/stream_arrow.svg";
import EditIcon from "../../../public/icons/edit/edit.svg";
import Button from '@components/buttons/Button';
import Input from '@components/inputs/Input';
import { Information } from '../interfaces';

function Informations({handleInputs, name, email, handlePhoto}: Information) {
  return (
    <div className='bg-white xl:w-[687px] border border-solid border-secondary_fill rounded-8t flex flex-col p-16t mx-auto mb-16t xl:mb-24t'>
      <div className="font-semibold text-primary flex items-center mb-24t">
        <StreamIcon className="w-[14px] h-[14px] mr-8t" />
        <h4>Vos informations</h4>
      </div>
      <div className='flex items-center mb-16t'>
        <div className='mr-8t bg-gradient-to-b from-gradient1 to-gradient2 text-[24px] w-[62px] h-[62px] rounded-full bg-primary flex justify-center items-center text-white font-semibold'>
          FG
          {/* {firstName?.toUpperCase().split('')[0]}{lastName?.toUpperCase().split('')[0]} */}
        </div>
        <Button myClass={'flex items-center'} handleClick={function (): void {
          throw new Error('Function not implemented.');
        }} type={''} size={''}>
          <EditIcon className="w-[17px] h-[17px] fill-primary mr-4t" />
          <span className="text-primary text-mid underline">Modifier</span>
        </Button>
      </div>
      <div className='xl:flex xl:w-full'>
        <div className='xl:mr-24t xl:basis-1/2'>
          <Input value={name} label={'Votre nom'} placeholder={'Jean Dujardin'} handleChange={handleInputs} name={"name"} infoMessage={''} />
        </div>
        <div className='xl:basis-1/2'>
        <Input value={email} label={'Votre email'} placeholder={'jeandujardin@gmail.com'} handleChange={handleInputs} name={"email"} infoMessage={''} />
        </div>
      </div>
    </div>
  )
}

export default Informations;