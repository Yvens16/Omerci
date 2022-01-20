import React, { useEffect, useState } from 'react';

import { useAuth } from '../context/AuthUserContext';
import { useFirestoreDb } from '../context/FirestoreContext';

import ChevronLeft from '../public/icons/arrow/chevron_left.svg'
import LeftArrow from '../public/icons/arrow/short_left.svg';
import QuestionMark from '../public/icons/basic/help_circle.svg';
import Clock from '../public/icons/basic/clock.svg';
import CreditCard from '../public/icons/basic/credit_card.svg';
import MoneyBag from '../public/icons/misc/money_bag.svg';


import Input from '@components/inputs/Input';
import Checkbox from '@components/inputs/Checkbox';
import type { NextPage } from 'next';
import Button from '@components/buttons/Button';

const Header = ({ cancelCreation }: { cancelCreation: () => void }) => (
  <div className='flex mb-48t lg:max-w-content lg:mx-auto lg:py-24t'>
    <div onClick={cancelCreation} className='lg:hidden'>
      <ChevronLeft className='fill-primary mr-16t' />
    </div>
    <div onClick={cancelCreation} className='hidden lg:flex lg:absolute lg:px-10t cursor-pointer'>
        <LeftArrow className='fill-primary'/>
      <span className='text-primary xl:text-mid xl:font-semibold'>Retour à l'accueil</span>
    </div>
    <div className='lg:max-w-[687px] lg:mx-auto flex-1'>
      <h2 className='text-black text-title font-semibold'>Créer une carte</h2>
      <span className='text-mid text-third'>Remplissez les informations de votre carte</span>
    </div>
  </div>
);

type WhyThisCard = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  values: {
    name: string,
    title: string,
    hasCagnotte: boolean,
    isPremium: boolean
  }
};

const WhyThisCard = ({ handleChange, values }: WhyThisCard) => (
  <div className='lg:flex lg:items-baseline'>
    <div className='lg:basis-1/4 lg:mr-16t'>
      <h4 className='font-semibold text-black text-mid'>Pour qui faites vous cette carte ?</h4>
    </div>
    <div className='lg:basis-3/4'>
      <div className='my-8t'>
        <Input name='name' value={values.name} label='Nom du destinataire' placeholder='Jean Dupont' handleChange={handleChange} infoMessage='' />
      </div>
      <div>
        <Input name='title' value={values.title} label='Donnez un titre à votre carte' placeholder='Merci pour tout Thomas !' handleChange={handleChange} infoMessage='' />
      </div>
      <div className='flex my-8t p-4t'>
        <Checkbox isCheck={values.hasCagnotte} name='hasCagnotte' handleCheck={handleChange} labelText='Ajouter une cagnotte en ligne' type={''} />
        <QuestionMark className='fill-[#6EDB8D]' />
      </div>
      <div className='flex bg-secondary_fill w-max rounded-4t p-4t'>
        <Checkbox isCheck={values.isPremium} name='isPremium' handleCheck={handleChange} labelText='Passer premium !' type={''} />
        <QuestionMark className='fill-primary' />
      </div>
    </div>
  </div>
);

interface IFromWho {
  values: {
    team: string,
  },
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const FromWho = ({ values, handleChange }: IFromWho) => (
  <div className='mt-48t mb-24t lg:flex'>
    <h4 className='font-semibold text-black text-mid mb-16t lg:basis-1/4 lg:mr-16t'>De la part de... ?</h4>
    <div className='lg:basis-3/4'>
      <Input name='team' value={values.team} label="Nom de groupe ou d'équipe" placeholder="Toute l'équipe compta !" handleChange={handleChange} infoMessage='' />
    </div>
  </div>
);

const Info = ({ }) => (
  <div className='flex flex-col bg-secondary_fill lg:bg-white p-16t my-24t lg:mb-48t rounded-8t'>
    <div className="flex flex-row items-center">
      <div>
        <Clock className='fill-primary mr-8t' />
      </div>
      <div className=''>
        <span>Créer le maintenant, </span>
        <span className='text-primary'>payez plus tard</span>
      </div>
    </div>
    <div className="flex my-8t items-center">
      <div>
        <CreditCard className='fill-primary' />
      </div>
      <div className='ml-8t'>
        Envoyez votre superbe carte à son destinataire pour seulement <span className='text-primary'>4,99</span>
      </div>
    </div>
    <div className="flex items-center">
      <MoneyBag className='fill-primary' />
      <span className='ml-8t'>Collecter de l'argent et offrez lui !</span>
    </div>
  </div>
);

const CreateCard: NextPage = () => {
  const initialWhyValues = { name: '', title: '', hasCagnotte: false, isPremium: false, team: '' };
  const [whyValues, setWhyValues] = useState(initialWhyValues);
  const [isDisabled, setDisabled] = useState(true);

  const { createNewCard } = useFirestoreDb();

  const { authUser } = useAuth();
  console.log('authUser:', authUser)

  const cancelCreation = () => {
    setWhyValues(initialWhyValues);
    // TODO: Re routing to mes cartes, page pas encore crée
  };
  const validateCreation = async () => {
    const { name, title, hasCagnotte, isPremium, team } = whyValues;
    const userId = authUser && authUser['uid'] ? authUser['uid'] : '';
    const recipientName = name;
    const teamName = team;
    await createNewCard({ userId, recipientName, title, hasCagnotte, isPremium, teamName });
    setWhyValues(initialWhyValues);
    // TODO: Re routing to la carte en question     
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setWhyValues({
      ...whyValues,
      [name]: type == 'checkbox' ? checked : value,
    });
  }
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
  return (
    <div className='bg-white h-screen lg:bg-default_bg'>
      <div className='pt-[32px] lg:pt-0 lg:mx-0 mx-16t'>
        <div className='lg:bg-white'>
          <Header cancelCreation={cancelCreation} />
        </div>
        <div className='lg:bg-white lg:max-w-[687px] lg:mx-auto'>
          <div className='lg:p-32t'>
            <WhyThisCard values={whyValues} handleChange={handleChange} />
            <FromWho values={whyValues} handleChange={handleChange} />
          </div>
        </div>
        <div className='lg:max-w-[687px] lg:mx-auto'>
          <Info />
        </div>
        <div className='flex justify-center lg:bg-white lg:max-w-[687px] lg:mx-auto lg:mt-24t'>
          <Button isDisabled={isDisabled} type='secondary' myClass='flex-1 mr-16t' handleClick={cancelCreation} size='big'>
            Annuler
          </Button>
          <Button isDisabled={isDisabled} myClass={'flex-1 '} handleClick={validateCreation} type='primary' size={'big'}>Créer la carte</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateCard;