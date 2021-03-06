import { validateEmail } from './../utilities/helpers';
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { auth } from '../firebase/index';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import type { NextPage } from 'next'
import Input from '../components/inputs/Input';
import Button from '../components/buttons/Button';
import SendIcon from '../public/icons/communication/Send.svg';
import { useAuth } from '../context/AuthUserContext';
import { useFirestoreDb } from '../context/FirestoreContext';
import {useRouter} from 'next/router';


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
  const router = useRouter();

  const getBack = () => {
    setStep(step - 1);
  }
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameEmpty('');
    setName(e.target.value);
  }
  const handleSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurnameEmpty('');
    setSurname(e.target.value);
  }
  const handleHowDoyouKnowUs = (val: string) => setHowDoyouKnowUs(val);

  const closeModal = () => setShow(false);
  const closeEmailModal = () => setEmailShow(false);
  const showModal = () => setShow(true);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailErrorMsg('');
    setEmail(e.target.value);
  }


  const goToDashboard = () => router.push('/personal_space');


  const handleLogin = () => {
    if (validateEmail(email) === null) {
      setEmailErrorMsg("L'adresse email n'est pas valide, veuillez r??essayer svp");
    } else {
      magicSignInUp(email);
      closeModal();
      setStep(1);
    }
  }

  const handleRegisterInfo = async() => {
    if (!name.length) {
      setNameEmpty("N'oubliez pas de rentrer votre nom !");
    } else if (!surname.length) {
      setSurnameEmpty("N'oubliez pas de rentrer votre pr??nom !")
    } else {
      const uid = authUser && authUser['uid'] ? authUser['uid'] : '';
      await addUserInfo({ uid, firstName: surname, lastName: name, howDoYouKnowUs: howDoyouKnowUs, email });
      goToDashboard();
    }
  }

  const handleAlienDeviceLogin = async() => {
    let userData: any;
    if (validateEmail(email) === null) {
      setEmailErrorMsg("L'adresse email n'est pas valide, veuillez r??essayer svp");
    } else {
      if (email) {
        try {
          userData = await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem('emailForSignIn');
          if(userData._tokenResponse.isNewUser) {
            setEmailShow(false);
            setStep(2);
          }
          else {
            const user = await getUserInfo(userData.user.uid);
            setSurname(user.firstName);
            setName(user.lastName);
            setEmail(user.email);
            setEmailShow(false);
            setStep(3);
          }
        } catch(err) {
          setEmailErrorMsg("L'email entr??e n'est pas le bon email");
        }
      }
    }
  }
  useEffect(() => {
    let emailInStorage:any = window.localStorage.getItem("emailForSignIn");
    const signIn = async() => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      let userData: any =  await signInWithEmailLink(auth, params.email, window.location.href);
      setEmail(params.email);
      window.localStorage.removeItem('emailForSignIn');
      if(userData._tokenResponse.isNewUser) setStep(2)
      else if (params.isAnonymous === 'true') {
          router.push("/personal_space")
        } else {
          const user = await getUserInfo(userData.user.uid);
          setSurname(user.firstName);
          setName(user.lastName);
          setEmail(user.email);
          setStep(3)
        };
      }

    if (isSignInWithEmailLink(auth, window.location.href)) {
      const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
      if (!emailInStorage && !params.email)??setEmailShow(true)
      else signIn();
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
      {show ? <Modal customClass='' closeModal={closeModal} show={show}>
        <div className='flex flex-col text-center'>
          <div className='flex flex-col items-center'>
            <SendIcon className='my-24t' />
          </div>
          <h2 className='text-title font-semibold my-16t'>Essayer ceci</h2>
          <div className='mt-16t mb-[40px] text-third'>
            <p className='my-8t'>Nous vous conseillons d???abord d???attendre un peu (cela peut prendre <span className='font-semibold'>jusqu???a 3 min</span>).</p>
            <p className='my-8t'>N???hesitez pas ??galement ?? regarder dans <span className='font-semibold'>vos spams</span></p>
            <p className='my-8t'>
              Enfin, si le probl??me n???est toujours pas r??solu, cliquez sur le bouton ci-dessous pour que l???on vous <span className='font-semibold'>renvoi un email de connexion </span></p>
          </div>
          <Button handleClick={handleLogin} type='primary' myClass='' size=''>
            Me renvoyer un email
          </Button>
        </div>
      </Modal> : null}
      {emailShow ? <Modal customClass='' closeModal={closeEmailModal} show={emailShow}>
        <div className='flex flex-col text-center'>
          <h3 className='text-black font-semibold text-18t text-center'><span className='mr-8t'>????</span>Oups, il semblerait que vous ayez chang?? d'appareil !</h3>
          <p className='text-base text-black mt-16t mb-[28px]'>Pour des raisons de s??curit??, veuillez reconfirmer votre adresse email</p>
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