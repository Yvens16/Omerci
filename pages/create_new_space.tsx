import React, { useEffect, useState } from 'react';
import ChevronLeft from '../public/icons/arrow/chevron_left.svg'
import QuestionMark from '../public/icons/basic/help_circle.svg';
import Clock from '../public/icons/basic/clock.svg';
import CreditCard from '../public/icons/basic/credit_card.svg';
import MoneyBag from '../public/icons/misc/money_bag.svg';


import Input from '@components/inputs/Input';
import Checkbox from '@components/inputs/Checkbox';
import type { NextPage } from 'next';
import Button from '@components/buttons/Button';

const Header = ({cancelCreation}: { cancelCreation: () => void }) => (
  <div className='flex mb-48t'>
    <div>
      <ChevronLeft onClick={cancelCreation} className='fill-primary mr-16t' />
    </div>
    <div>
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
  <div className=''>
    <h4 className='font-semibold text-black text-mid'>Pour qui faites vous cette carte ?</h4>
    <div>
      <div className='my-8t'>
        <Input name='name' value={values.name} label='Nom du destinataire' placeholder='Jean Dupont' handleChange={handleChange} infoMessage='' />
      </div>
      <div>
        <Input name='title' value={values.title} label='Donnez un titre à votre carte' placeholder='Merci pour tout Thomas !' handleChange={handleChange} infoMessage='' />
      </div>
      <div className='flex my-8t p-4t'>
        <Checkbox isCheck={values.hasCagnotte} name='hasCagnotte' handleCheck={handleChange} customClass='' labelText='Ajouter une cagnotte en ligne' type={''} />
        <QuestionMark className='fill-[#6EDB8D]' />
      </div>
      <div className='flex bg-secondary_fill w-max rounded-4t p-4t'>
        <Checkbox isCheck={values.isPremium} name='isPremium' handleCheck={handleChange} customClass='text-primary bg-white' labelText='Passer premium !' type={''} />
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
  <div className='mt-48t mb-24t'>
    <h4 className='font-semibold text-black text-mid mb-16t'>De la part de... ?</h4>
    <Input name='team' value={values.team} label="Nom de groupe ou d'équipe" placeholder="Toute l'équipe compta !" handleChange={handleChange} infoMessage='' />
  </div>
);

const Info = ({ }) => (
  <div className='flex flex-col bg-secondary_fill p-16t my-24t rounded-8t'>
    <div className="flex">
      <Clock className='fill-primary' />
      <div className='ml-8t'>
        <span>Créer le maintenant, </span>
        <span className='text-primary'>payez plus tard</span>
      </div>
    </div>
    <div className="flex my-8t">
      <CreditCard className='fill-primary' />
      <div className='ml-8t'>
        Envoyez votre superbe carte à son destinataire pour seulement <span className='text-primary'>4,99</span>
      </div>
    </div>
    <div className="flex">
      <MoneyBag className='fill-primary' />
      <span className='ml-8t'>Collecter de l'argent et offrez lui !</span>
    </div>
  </div>
);

const CreateCard: NextPage = () => {
  const initialWhyValues = { name: '', title: '', hasCagnotte: false, isPremium: false, team: '' };
  const [whyValues, setWhyValues] = useState(initialWhyValues);
  const [isDisabled, setDisabled] = useState(true);

  const cancelCreation = () => {
    setWhyValues(initialWhyValues);
    // TODO: Re routing to mes cartes, page pas encore crée
  };
  const validateCreation = () => {
    // TODO: Re routing to la carte en question 
    // TODO: Crée la carte en base de données
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
    <div className='bg-white h-screen'>
      <div className='pt-[32px] mx-16t'>
        <Header cancelCreation={cancelCreation}/>
        <WhyThisCard values={whyValues} handleChange={handleChange} />
        <FromWho values={whyValues} handleChange={handleChange} />
        <Info />
        <div className='flex justify-center mx-16t'>
          <Button isDisabled={isDisabled} type='secondary' myClass='flex-1 mr-16t' handleClick={function () {
            throw new Error('Function not implemented.');
          }} size='big'>
            Annuler
          </Button>
          <Button isDisabled={isDisabled} myClass={'flex-1 '} handleClick={function () {
            throw new Error('Function not implemented.');
          }} type='primary' size={'big'}>Créer la carte</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateCard;