/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import type { NextPage } from 'next'
import Link from 'next/link';
import Input from '../components/inputs/Input';
import Select from '../components/inputs/Select';
import Button from '../components/buttons/Button';
import ArrowLeft from '../public/icons/arrow/short_left.svg';
import LetterIllustration from '../public/icons/undraw/undraw_mail_sent_re_0ofv 1.svg';
import Modal from '../components/modal/Modal';
import SendIcon from '../public/icons/communication/Send.svg';


interface EnterEmailParams {
  handleEmail(e: any): void,
  handleLogin(): void,
  emailErrorMsg: string,
}

const EnterEmail = ({ handleEmail, handleLogin, emailErrorMsg }: EnterEmailParams) => {
  return (<>
    <h1 className='text-title font-semibold text-black leading-[33px]'>Connexion ou inscription</h1>
    <p className='text-third my-16t'>Tapez votre email pour vous inscrire ou vous connecter</p>
    <Input label='' placeholder='ici-votre@email.com' infoMessage={emailErrorMsg} handleChange={handleEmail} />
    <div className='bg-default_bg p-16t my-16t rounded-8t'>
      <p className='text-black_login mx-8t'>By signing up, you agree to our <span className='underline'><Link href='/login'>terms of service and privicy policy</Link></span></p>
    </div>
    <Button handleClick={handleLogin} type='primary' myClass='' size=''>
      Suivant
    </Button>
  </>);
}

interface EmailSentParams {
  email: string,
  showModal(): void,
}

const EmailSent = ({ email, showModal }: EmailSentParams) => {
  return <>
    <div className='flex items-center text-mid p-8t text-[#6A6774] my-16t'>
      <ArrowLeft className='fill-[#6A6774]' />
      <span>Retour</span>
    </div>
    <p className='my-16t text-black_login'>Un email avec un lien de connexion à été envoyé à l'adresse {email}</p>
    <div className='flex justify-center my-[27px]'>
      <LetterIllustration />
    </div>
    <span onClick={showModal} className='underline text-black_login'>Vous n'avez pas reçu d'email ?</span>
  </>;
}

interface SignUpParams {
  handleName(e: any): void,
  handleSurname(e: any): void,
  handleHowDoyouKnowUs(e : any): void,
  handleRegisterInfo(): void,
}

const SignUp = ({ handleName, handleSurname, handleHowDoyouKnowUs, handleRegisterInfo }: SignUpParams) => {
  const options = ['Linkedin', 'Facebook', 'Google', 'Bouche à oreille']
  return <>
    <p className='text-black font-semibold text-18t'>👋 Bienvenue !</p>
    <p className='text-black my-16t'>Dites nous en un peu plus sur vous</p>
    <Input label='Votre nom' placeholder='Dupont' infoMessage='' handleChange={handleName} />
    <Input label='Votre prénom' placeholder='Jean' infoMessage='' handleChange={handleSurname} />
    <div>
      <span className='my-4t text-black'>Comment nous avez vous connu ?</span>
      <Select optionList={options} getSelectedValue={handleHowDoyouKnowUs}/>
    </div>
    <Button handleClick={handleRegisterInfo} type='primary' myClass='' size=''>
      Suivant
    </Button>
  </>
}

const Login: NextPage = () => {
  const [email, setEmail] = useState('yves@gmail.com');
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [howDoyouKnowUs, setHowDoyouKnowUs] = useState('');

  const handleName = (e: any) => setName(e.target.value);
  const handleSurname = (e: any) => setSurname(e.target.value);
  const handleHowDoyouKnowUs = (val: string) => setName(val);

  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  const handleEmail = (e: any) => {
    setEmailErrorMsg('');
    setEmail(e.target.value);
  }

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = () => {
    if (validateEmail(email) === null) {
      setEmailErrorMsg("L'adresse email n'est pas valide, veuillez réessayer svp");
    } else {
      // TODO: Firebase Action to send connexion email here
    }
  }

  return (
    <>
      <div
        className='text-base text-center flex flex-col p-24t border border-solid border-secondary_fill rounded-12t bg-white w-11/12 mx-auto my-36t lg:w-1/3'>
        {/* <EnterEmail handleEmail={handleEmail} handleLogin={handleLogin} emailErrorMsg={emailErrorMsg} /> */}
        {/* <EmailSent email={email} showModal={showModal} /> */}
        <SignUp handleName={handleName} handleSurname={handleSurname} handleHowDoyouKnowUs={handleHowDoyouKnowUs} />
      </div>
      <Modal closeModal={closeModal} show={show}>
        <div className='flex flex-col text-center'>
          <div className='flex flex-col items-center'>
            <SendIcon className='my-16t' />
          </div>
          <p className='text-title my-16t'>Essayer ceci</p>
          <div className='my-16t  text-third'>
            <p className='my-4t'>Nous vous conseillons d’abord d’attendre un peu (cela peut prendre <span className='font-extrabold'>jusqu’a 3 min</span>).</p>
            <p className='my-4t'>N’hesitez pas également à regarder dans <span className='font-extrabold'>vos spams</span></p>
            <p className='my-4t'>
              Enfin, si le problème n’est toujours pas résolu, cliquez sur le bouton ci-dessous pour que l’on vous <span className='font-extrabold'>renvoi un email de connexion </span></p>
          </div>
          <Button handleClick={() => console.log('Hello')} type='primary' myClass='' size=''>
            Me renvoyer un email
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Login;