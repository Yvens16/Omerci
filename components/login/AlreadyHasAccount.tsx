/* eslint-disable react/no-unescaped-entities */
import React, { forwardRef } from 'react';
import Link from 'next/link';
import Button from '../buttons/Button';
import Ghost from '../../public/avatars/ghost.svg';
import { IAlreadyHasAccount } from '@components/login/interfaces';
import {useRouter} from 'next/router';

export const AlreadyHasAccount = ({ surname, name, email }: IAlreadyHasAccount) => {
  const router = useRouter();
  return <>
    <p className='text-18t text-semibold text-black text-center my-16t'>🎉 Content de vous revoir, {surname} !</p>
    <div className='bg-default_bg p-16t my-16t rounded-8t flex justify-start items-center'>
      <div className="mx-8t">
        <Ghost />
      </div>
      <div className="flex flex-col items-start">
        <p className="font-medium text-mid text-black">{surname} {name}</p>
        <p className="text-third">{email}</p>
      </div>
    </div>
    <Link href='/personal_space' passHref>
      <a className='flex justify-center' href="">
        <Button handleClick={() => console.log('go to personal space')} type='primary' myClass='mt-16t' size='big'>
          C'est parti !
        </Button>
      </a>
    </Link>
  </>;
};
