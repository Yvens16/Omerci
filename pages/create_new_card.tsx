/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import Input from '@components/inputs/Input';
import Checkbox from '@components/inputs/Checkbox';
import type { NextPage } from 'next';
import Button from '@components/buttons/Button';
import InfoModal from '@components/modal/InfoModal';
import Modal from '@components/modal/Modal';

import { useAuth } from '../context/AuthUserContext';
import { useFirestoreDb } from '../context/FirestoreContext';

import ChevronLeft from '../public/icons/arrow/chevron_custom_left.svg'
import LeftArrow from '../public/icons/arrow/short_left.svg';
import QuestionMark from '../public/icons/basic/help_circle.svg';
import Clock from '../public/icons/basic/clock.svg';
import CreditCard from '../public/icons/basic/credit_card.svg';
import MoneyBag from '../public/icons/misc/money_bag.svg';
import CircleCheck from '../public/icons/basic/circle_check.svg';
import Group from '../public/icons/user/group.svg';
import LetterIllustration from '../public/icons/undraw/undraw_mail_sent_re_0ofv 1.svg';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';


const Header = ({ cancelCreation }: { cancelCreation: () => void }) => (
  <div className='flex mb-32t md:text-center xl:text-left lg:max-w-content lg:mx-auto lg:pt-24t lg:pb-32t'>
    <div onClick={cancelCreation} className='lg:hidden cursor-pointer'>
      <ChevronLeft className='fill-primary stroke-primary mr-16t' />
    </div>
    <Button handleClick={cancelCreation} myClass='xl:-translate-y-[20%] hidden lg:flex lg:absolute lg:px-10t cursor-pointer' type='third' size=''>
      <>
        <LeftArrow className='fill-primary w-[24px] h-[24px]' />
        <span className='text-primary xl:text-mid xl:font-medium'>Retour à l'accueil</span>
      </>
    </Button>
    <div className='lg:max-w-[687px] lg:mx-auto flex-1'>
      <h1 className='text-black text-big font-semibold mb-8t'>Créer une carte</h1>
      <span className='text-mid text-third font-light'>Remplissez les informations de votre carte</span>
    </div>
  </div>
);

type WhyThisCard = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  values: {
    name: string,
    title: string,
    hasCagnotte: boolean,
    isPremium: boolean,
  },
  toggleCagnotteModal: (whenOpeningOnly: boolean) => void,
  togglePremiumModal: (whenOpeningOnly: boolean) => void,
};

const WhyThisCard = ({ handleChange, values, togglePremiumModal, toggleCagnotteModal }: WhyThisCard) => (
  <div className='lg:flex lg:items-baseline justify-between'>
    <div className='lg:basis-1/4 lg:mr-16t'>
      <h4 className='font-medium text-black text-mid lg:max-w-[140px]'>Pour qui est cette carte ?</h4>
    </div>
    <div className='lg:basis-3/4  lg:max-w-[420px]'>
      <div className='my-8t'>
        <Input name='name' value={values.name} label='Nom du destinataire' labelClass='font-light' placeholder='Jean Dupont' handleChange={handleChange} infoMessage='' />
      </div>
      <div>
        <Input name='title' value={values.title} label='Donnez un titre à votre carte' labelClass='font-light' placeholder='Merci pour tout Thomas !' handleChange={handleChange} infoMessage='' />
      </div>
      <div className='flex my-8t p-4t '>
        <Checkbox isCheck={values.hasCagnotte} name='hasCagnotte' handleCheck={handleChange} labelText='Ajouter une cagnotte en ligne' type={''} />
        <QuestionMark onClick={() => toggleCagnotteModal(true)} className='fill-[#6EDB8D]' />
      </div>
      <div className='flex bg-secondary_fill w-max rounded-4t p-4t text-primary font-light'>
        <Checkbox isCheck={values.isPremium} name='isPremium' handleCheck={handleChange} labelText='Passer premium !' type={''} />
        <QuestionMark onClick={() => togglePremiumModal(true)} className='fill-primary' />
      </div>
    </div>
  </div>
);

interface IFromWho {
  values: {
    team: string,
    name?: string,
    email?: string,
    userName?: string
  },
  isAnonymousFlow: boolean,
  emailAlreadyExist: boolean,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  toggleEmailModal: () => void,
}

const FromWho = ({ values, handleChange, isAnonymousFlow, emailAlreadyExist, toggleEmailModal }: IFromWho) => (
  <div className='mt-48t mb-24t lg:flex justify-between'>
    <h4 className='font-medium text-black text-mid mb-16t lg:basis-1/4 lg:mr-16t lg:max-w-[140px]'>De la part de... ?</h4>
    <div className="lg:flex lg:flex-col lg:basis-3/4 lg:max-w-[420px]">
      <div className='lg:basis-3/4 lg:max-w-[420px]'>
        <Input name='team' value={values.team} label="Nom de groupe ou d'équipe" labelClass='font-light' placeholder="Toute l'équipe compta !" handleChange={handleChange} infoMessage='' />
      </div>
      {isAnonymousFlow
        ? <>
          <div className='lg:basis-3/4 lg:max-w-[420px]'>
            <Input name='userName' value={values.userName} label="Votre nom" labelClass='font-light' placeholder="John Doe" handleChange={handleChange} infoMessage='' />
          </div>
          <div className='lg:basis-3/4 lg:max-w-[420px]'>
            <Input name='email' value={values.email} label="Votre email" labelClass='font-light' placeholder="johndoe@gmail.com" handleChange={handleChange} infoMessage='' />
            {
              emailAlreadyExist ?
                <span className="text-[13px] font-medium italic text-third">Cette adresse email possède déja <span className="text-primary cursor-pointer underline" onClick={() => toggleEmailModal()}>un compte Omerci</span>.
                </span>
                :
                <span className='text-[13px] font-medium italic text-third'>Nous vous enverrons un lien pratique pour gérer votre espace.</span>
            }
          </div>
        </> : null}
    </div>
  </div>
);

const Info = ({ }) => (
  <div className='flex flex-col bg-default_bg lg:bg-white lg:rounded-8t p-16t my-24t lg:mb-48t text-black font-light'>
    <div className="flex flex-row items-center">
      <div>
        <Clock className='fill-primary mr-8t' />
      </div>
      <div className=''>
        <span>Créer le maintenant, </span>
        <span className='text-primary font-normal'>payez plus tard</span>
      </div>
    </div>
    <div className="flex my-8t items-center">
      <div>
        <CreditCard className='fill-primary' />
      </div>
      <div className='ml-8t'>
        Envoyez votre superbe carte à son destinataire pour seulement <span className='text-primary font-normal'>4,99 €</span>
      </div>
    </div>
    <div className="flex items-center">
      <MoneyBag className='fill-primary' />
      <span className='ml-8t'>Collecter de l'argent et offrez lui !</span>
    </div>
  </div>
);

const CreateCard: NextPage = () => {
  const initialWhyValues = { name: '', title: '', hasCagnotte: false, isPremium: false, team: '', email: '', userName:'' };
  const [whyValues, setWhyValues] = useState(initialWhyValues);
  const [isDisabled, setDisabled] = useState(true);
  const [isAnonymousFlow, setAnonymousFlow] = useState<boolean>(false);
  const [emailAlreadyExist, setEmailAlreadyExist] = useState<boolean>(false);
  const [isEmailModalOpen, setEmailModal] = useState(false);
  const [isEmailSentModalOpen, setEmailSentModal] = useState(false);

  const { createNewCard } = useFirestoreDb();

  const { authUser, doesEmailAlreadyExist, anonymousSignIn, magicSignInUp } = useAuth();
  const cancelCreation = () => {
    setWhyValues(initialWhyValues);
    Router.back();
  };
  const validateCreation = async () => {
    if (!isAnonymousFlow) createCardKnownUser()
    else anonymousCreateCard();
  };

  const createCardKnownUser = async () => {
    const { name, title, hasCagnotte, isPremium, team } = whyValues;
    const userId = authUser && authUser['uid'] ? authUser['uid'] : '';
    const recipientName = name;
    const teamName = team;
    const cardRefId =  await createNewCard({ userId, recipientName, title, hasCagnotte, isPremium, teamName });
    setWhyValues(initialWhyValues);
    // TODO: Re routing to la carte en question  
    // Router.push(`/card/${cardRefId}`);
  }
  const anonymousCreateCard = async () => {
    const { name, title, hasCagnotte, isPremium, team, email } = whyValues;
    const userId = authUser && authUser['uid'] ? authUser['uid'] : '';
    const recipientName = name;
    const teamName = team;
    const doesEmailExist = await doesEmailAlreadyExist(email);
    setEmailAlreadyExist(doesEmailExist);
    if (doesEmailExist) {
      //todo : open modal
      setEmailModal(true);
    } else {
      const userId = await anonymousSignIn() as unknown as string;
      const cardRefId = await createNewCard({ userId, recipientName, title, hasCagnotte, isPremium, teamName });
    // TODO: Re routing to la carte en question   
      // Router.push(`/card/${cardRefId}`);
    }
    //TODO: Open connection modal 
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setWhyValues({
      ...whyValues,
      [name]: type == 'checkbox' ? checked : value,
    });
  }

  const toggleEmailModal = () => {
    setEmailModal((prevState) => !prevState);
  }
  const toggleEmailSentModal = () => {
    setEmailSentModal((prevState) => !prevState);
  }

  const sendEmailLink = async () => {
    const {name, title, hasCagnotte, isPremium, team, email} = whyValues;
    //todo: Send Email Link
    const queryString = `?name=${name}&title=${title}&isPremium=${isPremium}&team=${team}&hasCagnotte=${hasCagnotte}`;
    await magicSignInUp(email)
    toggleEmailModal();
    toggleEmailSentModal();
  }

  const getQueryParams = ( params: string, url: string ) => {
    let href = url;
    // this is an expression to get query strings
    let regexp = new RegExp( '[?&]' + params + '=([^&#]*)', 'i' );
    let qString = regexp.exec(href);
    return qString ? qString[1] : null;
  };
  const fillUpForm = async () => {
    const recipientName = getQueryParams("name", window.location.href)?.replace("%20", " ");
    const cardTitle = getQueryParams("title", window.location.href)?.replace("%20", " ");
    const teamName = getQueryParams("team", window.location.href)?.replace("%20", " ");
    const isPremium = getQueryParams("isPremium", window.location.href)?.length ? JSON.parse(getQueryParams("isPremium", window.location.href)?.replace("%20", " ").toLocaleLowerCase() || "") : false;
    const hasCagnotte = getQueryParams("isPremium", window.location.href)?.length ? JSON.parse(getQueryParams("hasCagnotte", window.location.href)?.replace("%20", " ").toLocaleLowerCase() || "") : false;
    setWhyValues({
      ...whyValues,
      name: recipientName || "",
      title: cardTitle || "",
      team: teamName || "",
      isPremium: isPremium || false,
      hasCagnotte: hasCagnotte || false 
    });
  }
  //todo: Usseffect to get email Link, verify if action state in link and set Form to action Link states
  useEffect(() => {
    fillUpForm();
  }, [])

  useEffect(() => {
    if (!authUser) setAnonymousFlow(true);
  }, [authUser])
  useEffect(() => {
    const { title, name, team } = whyValues;
    const disabledButtons = () => {
      if (title.length != 0 && name.length != 0 && team.length != 0) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
    disabledButtons();
  }, [whyValues]);
  const [isPremiumModalOpen, setPremiumModal] = useState(false);
  const [isCagnotteModalOpen, setCagnotteModal] = useState(false);
  const togglePremiumModal = (whenOpeningOnly?: boolean) => {
    if (whenOpeningOnly) setPremiumModal(true);
    else setPremiumModal(false);
  }
  const toggleCagnotteModal = (whenOpeningOnly?: boolean) => {
    if (whenOpeningOnly) setCagnotteModal(true);
    else setCagnotteModal(false);
  }
  return (
    <div className='bg-white lg:bg-default_bg pb-[15%]'>
      <div className='pt-[32px] lg:pt-0 lg:mx-0 mx-16t'>
        <div className='lg:bg-white'>
          <Header cancelCreation={cancelCreation} />
        </div>
        <div className='bg-white lg:max-w-[687px] lg:mx-auto lg:border lg:border-secondary_fill lg:rounded-12t'>
          <div className='lg:p-32t'>
            <WhyThisCard togglePremiumModal={togglePremiumModal} toggleCagnotteModal={toggleCagnotteModal} values={whyValues} handleChange={handleChange} />
            <FromWho toggleEmailModal={toggleEmailModal} emailAlreadyExist={emailAlreadyExist} isAnonymousFlow={isAnonymousFlow} values={whyValues} handleChange={handleChange} />
          </div>
        </div>
        <div className='lg:max-w-[687px] lg:mx-auto bg-white rounded-8t'>
          <Info />
        </div>
        <div className='flex justify-center lg:max-w-[687px] lg:mx-auto lg:mt-24t'>
          <Button isDisabled={false} type='secondary' myClass='flex-1 h-[40px] mr-16t' handleClick={cancelCreation} size='big'>
            Annuler
          </Button>
          <Button isDisabled={isDisabled} myClass={'flex-1 h-[40px] '} handleClick={validateCreation} type='primary' size={'big'}>Créer la carte</Button>
        </div>
      </div>

      <InfoModal show={isPremiumModalOpen} titleHtml={<>Passer à l'espace <br /> premium</>} closeModal={togglePremiumModal}>
        <div className='text-black'>
          <p className='mb-24t'>Faite en sorte que votre collaborateur se sente vraiment spécial ! Activez les fonctionnalité premium !</p>
          <div className='flex justify-start'><div className='mr-10t'>
            <CircleCheck className='fill-primary' />
          </div> <span> Des <span className='font-semibold'>arrières plans exclusifs</span></span></div>
          <div className='flex justify-start my-24t'><div className='mr-10t'>
            <CircleCheck className='fill-primary' />
          </div> <span> Personalisation de la <span className='font-semibold'>police</span></span></div>
          <div className='flex justify-start'><div className='mr-10t'>
            <CircleCheck className='fill-primary' />
          </div> <span> Possibilité d'ajouter<span className='font-semibold'> des messages vocaux</span></span></div>
          <div className='flex justify-start my-24t'><div className='mr-10t'>
            <CircleCheck className='fill-primary' />
          </div> <span >Augmentation de la taille limite de la cagnotte - <span className='font-semibold'> jusqu'a 600€</span></span></div>
          <div className='flex jsutify-start'> <span>Le tout pour <span className='font-semibold'>8,99€</span> </span></div>
          <p className='my-24t'>Vous pouvez ajouter la fonctionnalité maintenant ou plus tard.</p>
        </div>
      </InfoModal>

      <InfoModal show={isCagnotteModalOpen} titleHtml={<>Collecter de l'argent pour <br /> une cagnotte</>} closeModal={toggleCagnotteModal}>
        <div className='text-black text-center'>
          <p className='mb-24t'>Chaque participant à votre carte aura la possibilité de participer financièrement à une cagnotte!</p>
          <p>La quantité réunie pourra être tanrsformé en carte de notre partenaire <span className='text-primary underline'>Weedoogift</span> et être utilisée dans plus de 3000 enseignes partenaire</p>
          <p className='mt-24t'>Il y a une limite maximum de 300€. Passez à la version premium pour augmenter la capacité.</p>
        </div>
      </InfoModal>
      <Modal show={isEmailModalOpen} closeModal={toggleEmailModal} customClass=''>
        <div className="container">
          <div className="flex justify-center mb-24t mt-36t"><Group className="fill-black w-[36px] h-[36px]" /></div>
          <h2 className="text-title font-semibold text-center mb-8t">Souhaitez-vous vous connecter ?</h2>
          <p className="text-base text-center font-normal leading-[21px] mb-40t text-third">Il semble que cette addresse mail possède déja un compte. Nous vous enverrons un lien magique de connexion à l’adresse
            <span className='font-semibold'> {whyValues.email}</span></p>
          <div className='flex justify-center'>
            <Button isDisabled={false} type='secondary' myClass='flex-1 h-[40px] mr-16t' handleClick={toggleEmailModal} size='big'>
              Annuler
            </Button>
            <Button isDisabled={false} myClass={'flex-1 h-[40px]'} handleClick={sendEmailLink} type='primary' size={'big'}>Me connecter</Button>
          </div>
        </div>
      </Modal>

      <Modal show={isEmailSentModalOpen} closeModal={toggleEmailSentModal} customClass='' whichIcon='return'>
        <div className="container">
          <h2 className="text-base font-normal text-center text-black mb-24t">Un email avec un lien de connexion a été envoyé à l’adresse {whyValues.email}</h2>
          <div className='flex justify-center mt-[24px] mb-16t'>
            <LetterIllustration />
          </div>
          <div onClick={sendEmailLink} className='flex justify-center underline cursor-pointer'>
            Vous n’avez pas reçu d’email ?
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreateCard;
