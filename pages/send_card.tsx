import React, { useState, useEffect, useRef } from 'react';
import type { NextPage } from "next";
import Header from "@components/reusables/header/Header";
import ButtonSet from "@components/reusables/buttons_set/ButtonSet";
import { useFirestoreDb } from 'context/FirestoreContext';
import { useAuth } from 'context/AuthUserContext';
import { useRouter } from 'next/router';
import Recipient from '@components/send_card/recipient/Recipient';
const SendCardPage: NextPage = () => {
  const router = useRouter();
  const { cardTitle, recipient, cardId } = router.query;
  const [isDisabled, setIsDisabled] = useState(true);
  const [confirmationError, setConfirmationError] = useState<null | string>(null);
  const initialInputs = {
    name: "",
    email: "",
    email_confirmation: "",
    card_name: "",
    card_number: "",
    expiration: "",
    cvc: "",
  }
  const [inputs, setInputs] = useState(initialInputs);

  const reset = () => {
    setInputs({
      ...initialInputs,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  useEffect(() => {
    let isItDisabled = false;
    Object.values(inputs).map((val) => {
      if (val.length === 0) isItDisabled = true;
    })
    setIsDisabled(isItDisabled);
  }, [inputs])

  const confirmEmail = () => {
    inputs.email !== inputs.email_confirmation ? setConfirmationError("La confirmation d'eamil est différente de l'email entrée") : setConfirmationError(null);
  }

    //TODO: Create function to send the card
    //TODO: Add onBlur to verify confirmation email and email
    //TODO: Add stripe to pay for the card

  return (
    <div className="px-16t xl:px-0">
      <Header buttonContent={'Retour à l’accueil'} handleback={() => router.push(`/card/${cardId}`)} title={'Envoyer la carte 🚀 '} subtitle={`La carte “ ${cardTitle} ” à ${recipient}`} />
      <Recipient recipient={recipient} handleInputChange={handleInputChange} confirmEmail={confirmEmail}/>
      <ButtonSet isDisabled={isDisabled} cancel={reset} validate={function (): void {
        throw new Error('Function not implemented.');
      }} cancelText={'Annuler'} validateText={'Envoyer la carte'} />
    </div>
  );
}

export default SendCardPage;