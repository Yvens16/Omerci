import React from 'react'
import { IModalParams } from '../interfaces';
import SimpleModal from '@components/modal/SimpleModal';
import Image from 'next/image'
import Input from '@components/inputs/Input';
import Button from '@components/buttons/Button';
import Select from '@components/customs/custom_select/Select';
import { DateTime } from "luxon";
import { getNumberOfDaysInMonth, rangeDate, fromIsoStringToThreeValueDate, rangeYear, getMonths } from '../../utils/dateUtils';
import Checkbox from '@components/inputs/Checkbox';
import QuestionMark from '../../../public/icons/basic/help_circle.svg';


const dates = rangeDate(getNumberOfDaysInMonth(DateTime.utc().toISO()));
const optionDates = dates.map((day, idx) => {
  return { label: `${day}`, value: `${day}` };
})

const optionYears = rangeYear(fromIsoStringToThreeValueDate(DateTime.utc().toISO()).year).map((year, idx) => {
  return { label: `${year}`, value: `${year}` };
});

const optionMonth = getMonths().map((month, idx) => {
  return { label: `${month}`, value: `${idx + 1}` };
})

function Modal({ show, closeModal, photoUrl, backgrounds }: IModalParams) {
  return (
    <SimpleModal show={show} closeModal={closeModal} titleHtml={undefined}>
      <h3 className="font-medium text-title md:hidden mb-12t">Information de l’espace</h3>
      <h3 className="font-medium text-title hidden md:block mb-12t">Parametre de l’espace Yvens’s Fairwell</h3>
      <div className='profil'>
        <p className="text-14t font-semibold">Photo de profil</p>
        <div className="rounded-[50%] w-[69px] h-[69px] relative">
          <Image src={photoUrl} alt='image de profil' className='img_avatar rounded-[50%]' layout="fill" objectFit="cover"></Image>
        </div>
      </div>
      <div className="backgrounds">
        {/* <p className="text-14t font-medium">Arriere plan</p> */}
        {/* 
        Si un jour, on veut
        <div className="list flex w-[50%]">
          {backgrounds.map((url, idx) => {
            return <div className={`w-[64px] h-[64px] mr-8t`} style={{backgroundColor: `${url}`}} key={idx}></div>;
          })}
        </div> */}
        <Input label={'Titre de votre carte'} placeholder={''} handleChange={function (e: any): void {
          throw new Error('Function not implemented.');
        }} name={''} infoMessage={''}></Input>
        <Input label={'Nom du destinaire'} placeholder={''} handleChange={function (e: any): void {
          throw new Error('Function not implemented.');
        }} name={''} infoMessage={''}></Input>
        <Input label={'De la part de'} placeholder={''} handleChange={function (e: any): void {
          throw new Error('Function not implemented.');
        }} name={''} infoMessage={''}></Input>
        <span className="mb-4t text-14t text-black">Date limite</span>
        <div className="inputs_date max-w-[40%] flex justify-between">
          <Select optionList={optionDates} selectedItem={''} defaultValue={'12'} showOptionList={false} changeOption={function (): {} {
            throw new Error('Function not implemented.');
          }} />
          <Select optionList={optionMonth} selectedItem={''} defaultValue={'Mars'} showOptionList={false} changeOption={function (): {} {
            throw new Error('Function not implemented.');
          }} />
          <Select optionList={optionYears} selectedItem={''} defaultValue={'2022'} showOptionList={false} changeOption={function (): {} {
            throw new Error('Function not implemented.');
          }} />
        </div>
        <div className='flex my-8t p-4t mb-32t'>
          <Checkbox isCheck={true} name='hasCagnotte' handleCheck={() => console.log("Hello")} labelText='Ajouter une cagnotte en ligne' type={''} />
          <QuestionMark className='fill-[#6EDB8D]' />
        </div>
        <div className='flex'>
          <Button myClass={'mr-16t'} handleClick={function (): void {
            throw new Error('Function not implemented.');
          } } type={'secondary'} size={'big'}>Annuler</Button>
          <Button myClass={''} handleClick={function (): void {
            throw new Error('Function not implemented.');
          } } type={'primary'} size={'big'}>Enregistrer</Button>
        </div>
      </div>
      <style jsx global>{`
    .img_avatar {
      border-radius: 50%;
    }
  `}</style>
    </SimpleModal>
  )
}

export default Modal
