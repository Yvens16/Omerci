import { validateEmail } from './../utilities/helpers';
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { auth } from '../firebase/index';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import type { NextPage } from 'next'
import Input from '../components/inputs/Input';
import Button from '../components/buttons/Button';
import SendIcon from '../public/icons/communication/Send.svg';
import { useAuth } from '../context/AuthUserContext';
import { useFirestoreDb } from '../context/FirestoreContext';


import { IEnterEmailParams, IEmailSent, ISignUp, IAlreadyHasAccount } from '@components/login/interfaces';
import { IModal } from '@components/modal/interfaces';

const Modal = dynamic<IModal>(() => import('../components/modal/Modal'));

const EnterEmail = dynamic<IEnterEmailParams>(() =>
  import('../components/login/EnterEmail').then((mod) => mod.EnterEmail)
);

const EmailSent = dynamic<IEmailSent>(() =>
  import('../components/login/EmailSent').then((mod) => mod.EmailSent)
);

const SignUp = dynamic<ISignUp>(() =>
  import('../components/login/SignUp').then((mod) => mod.SignUp)
);

const AlreadyHasAccount = dynamic<IAlreadyHasAccount>(() =>
  import('../components/login/AlreadyHasAccount').then((mod) => mod.AlreadyHasAccount)
);
const Login: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [emailShow, setEmailShow] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [howDoyouKnowUs, setHowDoyouKnowUs] = useState<string>('Linkedin');
  const [nameEmpty, setNameEmpty] = useState<string>("");
  const [surnameEmpty, setSurnameEmpty] = useState<string>('');
  const [step, setStep] = useState<any>(0);

  const { magicSignInUp, authUser, afterGettingLink, loading } = useAuth();
  const { addUserInfo, getUserInfo } = useFirestoreDb();

  const getBack = () => {
    setStep(step - 1);
  }
  const handleName = (e: any) => {
    setNameEmpty('');
    setName(e.target.value);
  }
  const handleSurname = (e: any) => {
    setSurnameEmpty('');
    setSurname(e.target.value);
  }
  const handleHowDoyouKnowUs = (val: string) => setHowDoyouKnowUs(val);

  const closeModal = () => setShow(false);
  const closeEmailModal = () => setEmailShow(false);
  const showModal = () => setShow(true);

  const handleEmail = (e: any) => {
    setEmailErrorMsg('');
    setEmail(e.target.value);
  }



  const handleLogin = () => {
    if (validateEmail(email) === null) {
      setEmailErrorMsg("L'adresse email n'est pas valide, veuillez réessayer svp");
    } else {
      magicSignInUp(email);
      closeModal();
      setStep(1);
    }
  }

  const handleRegisterInfo = () => {
    if (!name.length) {
      setNameEmpty("N'oubliez pas de rentrer votre nom !");
    } else if (!surname.length) {
      setSurnameEmpty("N'oubliez pas de rentrer votre prénom !")
    } else {
      const uid = authUser && authUser['uid'] ? authUser['uid'] : '';
      addUserInfo({ uid, firstName: surname, lastName: name, howDoYouKnowUs: howDoyouKnowUs, email });
      //TODO: redirect to my cards page
    }
  }

  const handleAlienDeviceLogin = async() => {
    let userData: any;
    if (email) {
      userData = await signInWithEmailLink(auth, email, window.location.href);
      if(userData._tokenResponse.isNewUser) setStep(2)
      else setStep(3);
    }
    // if(user && user._tokenResponse.isNewUser)

    
    // window.localStorage.setItem('emailForSignIn', email);
    // afterGettingLink().then((rel: any) => {
    //   if (rel) {
    //     if (rel.isNewUser) {
    //       setStep(2)
    //     } else {
    //       getUserInfo(rel.uid).then((data) => {
    //         setEmail(data.email);
    //         setSurname(data.firstName);
    //         setName(data.lastName)
    //         setStep(3);
    //       })
    //     }
    //   }
    //   setEmailShow(false);
    // });
  }

  useEffect(() => {
    let emailInStorage = window.localStorage.getItem("emailForSignIn");
    if (isSignInWithEmailLink(auth, window.location.href)) {
      if (!emailInStorage) {
        setEmailShow(true);
      } 
    }
  }, [])


  const enterEmail = <EnterEmail handleEmail={handleEmail} handleLogin={handleLogin} emailErrorMsg={emailErrorMsg} />;
  const emailSent = <EmailSent email={email} showModal={showModal} getBack={getBack} />;
  const signUp = <SignUp handleName={handleName} handleSurname={handleSurname} handleHowDoyouKnowUs={handleHowDoyouKnowUs} handleRegisterInfo={handleRegisterInfo} nameEmpty={nameEmpty}
    surnameEmpty={surnameEmpty} />;
  const alreadyHasAccount = <AlreadyHasAccount surname={surname} name={name} email={email} />;
  const components = [enterEmail, emailSent, signUp, alreadyHasAccount];
  return (
    <>
      <div
        className='mt-[40px] lg:mt-[140px] text-base text-center flex flex-col p-24t border border-solid border-secondary_fill rounded-12t bg-white w-11/12 mx-16t md:mx-auto my-36t md:w-[462px]'>
        {components[step]}
      </div>
      {/* {loading ? <h1>It is loading</h1> :
        <div
          className='mt-[40px] lg:mt-[140px] text-base text-center flex flex-col p-24t border border-solid border-secondary_fill rounded-12t bg-white w-11/12 mx-16t md:mx-auto my-36t md:w-[462px]'>
          {components[0]}
        </div>
      } */}
      {show ? <Modal closeModal={closeModal} show={show}>
        <div className='flex flex-col text-center'>
          <div className='flex flex-col items-center'>
            <SendIcon className='my-24t' />
          </div>
          <h2 className='text-title font-semibold my-16t'>Essayer ceci</h2>
          <div className='mt-16t mb-[40px] text-third'>
            <p className='my-8t'>Nous vous conseillons d’abord d’attendre un peu (cela peut prendre <span className='font-semibold'>jusqu’a 3 min</span>).</p>
            <p className='my-8t'>N’hesitez pas également à regarder dans <span className='font-semibold'>vos spams</span></p>
            <p className='my-8t'>
              Enfin, si le problème n’est toujours pas résolu, cliquez sur le bouton ci-dessous pour que l’on vous <span className='font-semibold'>renvoi un email de connexion </span></p>
          </div>
          <Button handleClick={handleLogin} type='primary' myClass='' size=''>
            Me renvoyer un email
          </Button>
        </div>
      </Modal> : null}
      {emailShow ? <Modal closeModal={closeEmailModal} show={emailShow}>
        <div className='flex flex-col text-center'>
          <h3 className='text-black font-semibold text-18t text-center'><span className='mr-8t'>👋</span>Oups, il semblerait que vous ayez changé d'appareil !</h3>
          <p className='text-base text-black mt-16t mb-[28px]'>Pour des raisons de sécurité, veuillez reconfirmer votre adresse email</p>
          <Input name='email2' label='' placeholder='ici-votre@email.com 2222' infoMessage={emailErrorMsg} handleChange={handleEmail} />
          <Button handleClick={handleAlienDeviceLogin} type='primary' myClass='mb-16t mt-32t' size='big'>
            Suivant
          </Button>
        </div>
      </Modal> : null}

    </>
  );
}

export default Login;