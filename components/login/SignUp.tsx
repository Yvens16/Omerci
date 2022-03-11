import React from 'react';
import Input from '@components/inputs/Input';
import Button from '@components/buttons/Button';
import Select from '@components/inputs/Select';
import { ISignUp } from './interfaces';

export const SignUp = ({
  handleName,
  handleSurname,
  handleHowDoyouKnowUs,
  handleRegisterInfo,
  nameEmpty,
  surnameEmpty
}: ISignUp) => {
  const options = ['Linkedin', 'Facebook', 'Google', 'Bouche à oreille', 'Autre'];
  return <>
    <p className='text-black font-semibold text-18t text-left'><span className='mr-8t'>👋</span>  Bienvenue !</p>
    <p className='text-black my-16t text-left'>Dites nous en un peu plus sur vous</p>
    <div>
      <Input name='name' label='Votre nom' placeholder='Dupont' infoMessage={nameEmpty} handleChange={handleName} />
    </div>
    <div className='mt-16t'>
      <Input name='surname' label='Votre prénom' placeholder='Jean' infoMessage={surnameEmpty} handleChange={handleSurname} />
    </div>
    <div className='mt-16t'>
      <p className='my-4t text-black text-left'>Comment nous avez vous connu ?</p>
      <Select optionList={options} getSelectedValue={handleHowDoyouKnowUs} />
    </div>
    <Button handleClick={handleRegisterInfo} type='primary' myClass='mt-32t' size='big'>
      Suivant
    </Button>
  </>;
};
  

  