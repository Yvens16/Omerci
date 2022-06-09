import React from 'react'
import { IEmailSettings } from '../interfaces';
import StreamIcon from "../../../public/icons/arrow/stream_arrow.svg";
import Checkbox from '@components/inputs/Checkbox';

const inputs = [
  {
    title: "Envoyez moi un email pour...",
    inputs: [{ name: "instructions", labelText: "Des instructions lorsque je crée une carte" }, { name: "new_message", labelText: "Un nouveau message envoyé dans une carte" }, { name: "card_opened", labelText: "Un destinataire à ouvert une carte que je lui ai envoyé" }, { name: "card_not_sent", labelText: "Des rappels concernant des cartes que j’aurais oublié d’envoyer" }]
  },
  {
    title: "Les espcaes où je participe",
    inputs: [{ name: "card_sent", labelText: "Lorsque une carte est envoyé au destinataire" }]
  },
  {
    title: "Général",
    inputs: [{ name: "news", labelText: "Des infos concernant des nouveautés de Omerci.com" }]
  },
]

function EmailSettings({ settings, handleInputs }: IEmailSettings) {
  return (
    <div
      className='email_settings border border-solid border-secondary_fill rounded-8t p-16t m-16t xl:max-w-laptopContent mx-auto'>
      <div className='text-primary flex items-center mb-24t text-mid font-semibold'>
        <StreamIcon className="w-[14px] h-[14px] mr-8t" />
        Envoyez moi un email pour...
      </div>
      {inputs.map((section, index) => (
        <div key={index} className="className">
          <p className='mb-12t text-black text-medium italic text-14t font-semibold'>{section.title}</p>
          {section.inputs.map((input, idx) => (
            <div key={idx} className="flex mb-8t">
              <Checkbox labelText={input.labelText} type={''} handleCheck={handleInputs} name={input.name} isCheck={settings[input.name]} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default EmailSettings;