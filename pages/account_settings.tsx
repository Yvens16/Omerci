import { useState, useEffect, useRef } from 'react';
import type { NextPage } from "next";
import Header from "@components/reusables/header/Header";
import Informations from "@components/settings/informations/Informations";
import EmailSettings from "@components/settings/email_settings/EmailSettings";
import ButtonSet from "@components/reusables/buttons_set/ButtonSet";
import { useFirestoreDb } from 'context/FirestoreContext';
import { useAuth } from 'context/AuthUserContext';
import { useRouter } from 'next/router';
import { auth } from 'firebase';


const AccountSettings: NextPage = () => {
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const { updateSettings, getUserInfo, updatePhoto } = useFirestoreDb();
  const { authUser } = useAuth();
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

  const [fileUrlToShow, setFileToShowURL] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  const [isRegistered, setIsRegistered] = useState(false);

  const onFileChange = (e: any) => {
    setSelectedFile( e.target.files[0]);
    const selectedFile: File = e.target.files[0];
    if (selectedFile.type.includes("image")) setFileToShowURL(URL.createObjectURL(selectedFile));
  }
  const onFileClick = () => {
    hiddenFileInput.current?.click();
  }

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const handleCheckboxes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEmailSettings({
      ...emailSettings,
      [name]: checked,
    })
  }

  const reset = () => {
    setIsRegistered(!isRegistered);
    // setEmailSettings(settingsDefault);
    // setInputs(inputsDefault);
  }

  const update = async () => {
    const { instructions, new_message, card_opened, card_not_sent, card_sent, news } = emailSettings;
    const { name, email } = inputs;
    if (authUser && authUser["uid"]) {
      await updateSettings({ uid: authUser["uid"], instructions, new_message, card_opened, card_not_sent, card_sent, news, name, email })
      await updatePhoto({ uid: authUser['uid'], name: `${authUser["firstName"]}_${authUser["lastName"]}`, file: selectedFile});
      setIsRegistered(!isRegistered);
    }
  }

  useEffect(() => {
    if (authUser && authUser['uid']) {
      const getUserData = async () => {
        const user = await getUserInfo(authUser['uid']);
        setInputs({
          name: `${user.firstName} ${user.lastName}`,
          email: user.email
        })
        setEmailSettings({
          instructions: user.settings.instructions,
          new_message: user.settings.new_message,
          card_opened: user.settings.card_opened,
          card_not_sent: user.settings.card_not_sent,
          card_sent: user.settings.card_sent,
          news: user.settings.news,
        })
        setFileToShowURL(user.profileImage)
      }
      getUserData();
    }
  }, [authUser, isRegistered])

  return (
    <div className="px-16t xl:px-0">
      <Header buttonContent="Retour au dashboard" handleback={() => router.back()} title="Réglages du compte" subtitle="Retrouvez ici vos informations et autorisations" />
      <Informations handleInputs={handleInputs} onFileClick={onFileClick} handlePhoto={onFileChange} name={inputs.name} email={inputs.email} ref={hiddenFileInput} photoUrl={fileUrlToShow}/>
      <EmailSettings handleInputs={handleCheckboxes} settings={emailSettings} />
      <ButtonSet cancel={reset} validate={update} cancelText={"Annuler"} validateText={"Enregistrer"} />
    </div>
  );
}

export default AccountSettings;