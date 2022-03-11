import React from 'react';
import Link from 'next/link';
import Input from '../inputs/Input';
import Button from '../buttons/Button';
import { IEnterEmailParams } from './interfaces';


export const EnterEmail = ({ handleEmail, handleLogin, emailErrorMsg }: IEnterEmailParams) => {
  return (<>
    <h1 className='text-title font-semibold text-black leading-[33px]'>Connexion ou inscription</h1>
    <p className='hidden xl:block text-third mt-[16px] mb-[20px]'>Tapez votre email pour vous inscrire ou vous <br /> connecter</p>
    <p className='xl:hidden text-third mt-16t mb-[20px]'>Tapez votre email pour vous inscrire ou vous connecter</p>
    <Input name='email_login' label='' placeholder='jean.dujardin@gmail.com' infoMessage={emailErrorMsg} handleChange={handleEmail} />
    <div className='bg-default_bg p-16t mt-16t mb-32t rounded-8t'>
      <p className='text-black mx-8t'>By signing up, you agree to our <span className='underline'><Link href='/login'>terms of service and privicy policy</Link></span></p>
    </div>
    <Button handleClick={handleLogin} type='primary' myClass='' size='big'>
      Suivant
    </Button>
  </>);
};
