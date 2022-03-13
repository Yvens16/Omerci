import React from "react"
import Image from 'next/image';
import Button from '../../components/buttons/Button';
import MoreIcon from '../../public/icons/misc/plus.svg';
import {useRouter} from 'next/router';

type EmptyCard = {
  imgLink: string,
  text: string,
  addNewCard: () => Promise<void> | void,
}

const EmptyCard = ({ imgLink, text, addNewCard }: EmptyCard) => {
  const router = useRouter();
  return <div className="rounded-12t p-16t flex flex-col items-center">
    <div className='mb-8t relative overflow-hidden	border border-solid border-white w-[124px] h-[124px] rounded-16t flex justify-center items-center text-white text-[20px] font-semibold'>
      <Image src={imgLink} priority={true} alt="Carte vide" layout="fill" objectFit="cover" />
    </div>
    <span className='font-semibold text-14t text-black mb-24t'>{text}</span>
    <Button myClass='' handleClick={() => router.push('create_new_card  ')} type='primary' size='big'>
      <MoreIcon className='fill-white mr-2' />
      <span >Ajouter une carte</span>
    </Button>
  </div>
}

export default EmptyCard;