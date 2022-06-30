import { useState } from 'react';
import type { NextPage } from "next";
import Header from "@components/reusables/header/Header";
import Informations from "@components/settings/informations/Informations";
import EmailSettings from "@components/settings/email_settings/EmailSettings";
import ButtonSet from "@components/reusables/buttons_set/ButtonSet";
import { getValue } from '@testing-library/user-event/dist/types/utils';

// buttonContent: string,
// handleback: () => void,
// title: string,
// subtitle: string,
const AccountSettings: NextPage = () => {
  const settingsDefault = {
    instructions: false,
    new_message: false,
    card_opened: false,
    card_not_sent: false,
    card_sent: false,
    news: false,
  }
  const inputsDefault = {
    name: "",
    email: ""
  }
  const [emailSettings, setEmailSettings] = useState(settingsDefault);

  const [inputs, setInputs] = useState(inputsDefault);

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const handleCheckboxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target;
    setEmailSettings({
      ...emailSettings,
      [name]: checked,
    })
  }

  const reset = () => {
    setEmailSettings(settingsDefault);
    setInputs(inputsDefault);
  }

  //TODO: Add api call to register settings
  return (
    <div className="px-16t xl:px-0">
      <Header buttonContent="Retour au dashboard" handleback={function (): void {
        throw new Error("Function not implemented.");
      }} title="Réglages du compte" subtitle="Retrouvez ici vos informations et autorisations" />
      <Informations handleInputs={handleInputs} handlePhoto={function (): void {
        throw new Error("Function not implemented.");
      }} name={inputs.name} email={inputs.email} />
      <EmailSettings handleInputs={handleCheckboxes} settings={emailSettings} />
      <ButtonSet cancel={reset} validate={function (): void {
        throw new Error("Function not implemented.");
      }} cancelText={"Annuler"} validateText={"Enregistrer"} />
    </div>
  );
}

export default AccountSettings;