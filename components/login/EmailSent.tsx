/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Button from '../buttons/Button';
import ArrowLeft from '../../public/icons/arrow/short_left.svg';
import LetterIllustration from '../../public/icons/undraw/undraw_mail_sent_re_0ofv 1.svg';
import { IEmailSent } from './interfaces';

export const EmailSent = ({ email, showModal, getBack }: IEmailSent) => {
  return <>
    <div>
      <Button myClass='' handleClick={getBack} size='' type='third'>
        <ArrowLeft className='w-[17px] h-[17px] fill-[#6A6774] mr-4t' />
        <span>Retour</span>
      </Button>
      <p className='my-16t text-black'>Un email avec un lien de connexion à été envoyé à l'adresse {email}</p>
    </div>
    <div className='flex justify-center mt-[24px] mb-16t'>
      <LetterIllustration />
    </div>
    <span onClick={showModal} className='underline text-black cursor-pointer'>Vous n'avez pas reçu d'email ?</span>
  </>;
};
