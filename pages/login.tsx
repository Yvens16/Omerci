/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import type { NextPage } from 'next'
import Link from 'next/link';
import Input from '../components/inputs/Input';
import Select from '../components/inputs/Select';
import Button from '../components/buttons/Button';
import ArrowLeft from '../public/icons/arrow/short_left.svg';
import LetterIllustration from '../public/icons/undraw/undraw_mail_sent_re_0ofv 1.svg';
import Modal from '../components/modal/Modal';
import SendIcon from '../public/icons/communication/Send.svg';
import Ghost from '../public/avatars/ghost.svg';
import { useAuth } from '../context/AuthUserContext';
import { useFirestoreDb } from '../context/FirestoreContext';
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
  getBack(): void,
}

const EmailSent = ({ email, showModal, getBack }: EmailSentParams) => {
  return <>
    <div onClick={getBack} className='flex items-center text-mid p-8t text-[#6A6774] my-16t cursor-pointer'>
      <ArrowLeft className='fill-[#6A6774]' />
      <span>Retour</span>
    </div>
    <p className='my-16t text-black_login'>Un email avec un lien de connexion à été envoyé à l'adresse {email}</p>
    <div className='flex justify-center my-[27px]'>
      <LetterIllustration />
    </div>
    <span onClick={showModal} className='underline text-black_login cursor-pointer'>Vous n'avez pas reçu d'email ?</span>
  </>;
}

interface SignUpParams {
  handleName(e: any): void,
  handleSurname(e: any): void,
  handleHowDoyouKnowUs(e: any): void,
  handleRegisterInfo(): void,
  nameEmpty: string,
  surnameEmpty: string,
}

const SignUp = ({ handleName, handleSurname, handleHowDoyouKnowUs, handleRegisterInfo, nameEmpty, surnameEmpty }: SignUpParams) => {
  const options = ['Linkedin', 'Facebook', 'Google', 'Bouche à oreille', 'Autre']
  return <>
    <p className='text-black font-semibold text-18t'>👋 Bienvenue !</p>
    <p className='text-black my-16t'>Dites nous en un peu plus sur vous</p>
    <Input label='Votre nom' placeholder='Dupont' infoMessage={nameEmpty} handleChange={handleName} />
    <Input label='Votre prénom' placeholder='Jean' infoMessage={surnameEmpty} handleChange={handleSurname} />
    <div>
      <span className='my-4t text-black'>Comment nous avez vous connu ?</span>
      <Select optionList={options} getSelectedValue={handleHowDoyouKnowUs} />
    </div>
    <Button handleClick={handleRegisterInfo} type='primary' myClass='' size=''>
      Suivant
    </Button>
  </>
}

interface AlreadyHasAccountParams {
  surname: string,
  name: string,
  email: string,
}

const AlreadyHasAccount = ({ surname, name, email }: AlreadyHasAccountParams) => {
  return <>
    <p className='text-18t text-semibold text-black_login text-center my-16t'>🎉 Content de vous revoir, {surname} !</p>
    <div className='bg-default_bg p-16t my-16t rounded-8t flex justify-start items-center'>
      <div className="mx-8t">
        <Ghost />
      </div>
      <div className="flex flex-col items-start">
        <p className="font-medium text-mid text-black_login">{surname} {name}</p>
        <p className="text-third">{email}</p>
      </div>
    </div>
    <Link href='/login' passHref>
      <Button handleClick={() => console.log('Hello')} type='primary' myClass='' size=''>
        C'est parti !
      </Button>
    </Link>
  </>
}

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>('votre@email.com');
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [emailShow, setEmailShow] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [howDoyouKnowUs, setHowDoyouKnowUs] = useState<string>('Linkedin');
  const [nameEmpty, setNameEmpty] = useState<string>("");
  const [surnameEmpty, setSurnameEmpty] = useState<string>('');
  const [step, setStep] = useState<any>(null);

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
    }
  }

  const handleAlienDeviceLogin = () => {
    window.localStorage.setItem('emailForSignIn', email);
    afterGettingLink().then((rel: any) => {
      if (rel) {
        if (rel.isNewUser) {
          setStep(2)
        } else {
          getUserInfo(rel.uid).then((data) => {
            setEmail(data.email);
            setSurname(data.firstName);
            setName(data.lastName)
            setStep(3);
          })
        }
      }
    });
  }
  useLayoutEffect(() => {
    if (!authUser && window.location.href.includes('mode=signIn')) {
      let email: string = window.localStorage.getItem('emailForSignIn') as string;
      if (email) {
        afterGettingLink().then((rel: any) => {
          if (rel) {
            if (rel.isNewUser) {
              setStep(2)
            } else {
              getUserInfo(rel.uid).then((data) => {
                setEmail(data.email);
                setSurname(data.firstName);
                setName(data.lastName)
                setStep(3);
              })
            }
          }
        });
      } else {
        setEmailShow(true);
      }
    } else if(!window.location.href.includes('mode=signIn')) {
      setStep(0);
    }
  }, [afterGettingLink, authUser, getUserInfo, loading])

  const enterEmail = <EnterEmail handleEmail={handleEmail} handleLogin={handleLogin} emailErrorMsg={emailErrorMsg} />;
  const emailSent = <EmailSent email={email} showModal={showModal} getBack={getBack} />;
  const signUp = <SignUp handleName={handleName} handleSurname={handleSurname} handleHowDoyouKnowUs={handleHowDoyouKnowUs} handleRegisterInfo={handleRegisterInfo} nameEmpty={nameEmpty}
    surnameEmpty={surnameEmpty} />;
  const alreadyHasAccount = <AlreadyHasAccount surname={surname} name={name} email={email} />;
  const components = [enterEmail, emailSent, signUp, alreadyHasAccount];
  return (
    <>
      {loading ? <h1>It is loading</h1> :
        <div
          className='text-base text-center flex flex-col p-24t border border-solid border-secondary_fill rounded-12t bg-white w-11/12 mx-auto my-36t lg:w-1/3'>
          {components[step]}
        </div>
      }
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
          <Button handleClick={handleLogin} type='primary' myClass='' size=''>
            Me renvoyer un email
          </Button>
        </div>
      </Modal>
      <Modal closeModal={closeEmailModal} show={emailShow}>
        <div className='flex flex-col text-center'>
          <p className='text-mid my-16t'>Entrez votre email pour vous connecter</p>
          <Input label='' placeholder='ici-votre@email.com' infoMessage={emailErrorMsg} handleChange={handleEmail} />
          <Button handleClick={handleAlienDeviceLogin} type='primary' myClass='my-16t' size=''>
            Me connecter
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Login;