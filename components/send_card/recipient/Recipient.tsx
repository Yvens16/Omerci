import React from 'react'
import StreamIcon from "../../../public/icons/arrow/stream_arrow.svg";
import AttentionIcon from "../../../public/icons/attention/error.svg";
import Input from '@components/inputs/Input';
import { IRecipient } from './interface';


const sections = [
  {
    title: "Le destinataire",
    inputs: [
      { name: "name", placeholder: "Jean Dujardin", labelText: "Nom du destinataire" },
      { name: "email", placeholder: "jeandujardin@gmail.com", labelText: "Email du destinataire" },
      { name: "email_confirmation", placeholder: "jeandujardin@gmail.com", labelText: "Comfirmation de l’email du destinataire" },
    ]
  },
  {
    title: "Information sur le paiement",
    inputs: [
      { name: "card_name", placeholder: "Dujardin Jean", labelText: "Nom sur la carte" },
      { name: "card_number", placeholder: "1265 8704 4274 6734", labelText: "Numéro de carte" },
      { name: "expiration", placeholder: "13/26", labelText: "Expiration" },
      { name: "cvc", placeholder: "123", labelText: "CVC" },
    ]
  },
];
function Recipient({recipient, handleInputChange, confirmEmail}: IRecipient) {
  return (
    <div className='max-w-laptopContent mx-auto'>
      <div className='flex text-primary p-12t rounded-8t mb-24t border border-primary border-solid'>
        <AttentionIcon className="fill-primary min-w-[24px] mr-8t" />
        <div>
          Une fois votre carte envoyée, les <span className='font-semibold'>participations seront bloquées</span> et nous enverrons cette carte à <span className='font-semibold'>{recipient}</span>
        </div>
      </div>
      {sections.map((section, idx) => (
        <div className={`grid grid-cols-4
        bg-white xl:grid xl:grid-rows-3 gap-[16px] xl:gap-y-0 border border-solid border-secondary_fill rounded-8t p-16t mb-16t xl:mb-24t`} key={idx}>
          <div className='text-primary flex items-center mb-24t text-mid font-semibold col-span-4'>
            <StreamIcon className="w-[14px] h-[14px] mr-8t" />
            {section.title}
          </div>
          {section.inputs.map((input, index) => (
            <div key={index}
              className={` ${index}
              ${idx === 1 && (index === 2 || index === 3) && "col-span-2"}
              ${idx === 1 && (index === 1) && "col-span-4"}
              ${idx === 1 && index === 0 && "col-span-4 xl:col-span-2 xl:col-start-1"}
              ${idx === 1 && index === 1 && "xl:col-span-2 xl:col-start-1"}
              ${idx === 1 && index === 2 && "xl:col-span-1"}
              ${idx === 1 && index === 3 && "xl:col-span-1"}
              ${idx === 0 && index === 0 && "col-span-4 xl:col-start-1 xl:col-end-3"}
              ${idx === 0 && index === 1 && "col-span-4 xl:col-start-1 xl:col-end-3"}
              ${idx === 0 && index === 2 && "col-span-4 xl:col-start-3 xl:col-end-5"}
              mb-16t`
              }>
              <Input labelClass='font-light' label={input.labelText} placeholder={input.placeholder} handleChange={(e) => handleInputChange(e)} name={input.name} infoMessage={''} />
            </div>
          ))}
          {idx === 1
            && <div className='col-span-full bg-beige_bg p-16t rounded-8t'>Vous envoyez beaucoup de cartes ?  <span className='text-black font-semibold text-14t'>Economisez 30%</span> sur chaque nouvelle carte avec <span className='text-primary underline font-semibold'>un pack annuel</span>. En le prenant maintenant , la remise sera egalement appliqué à cette carte !</div>}
        </div>
      ))}
    </div>
  )
}

export default Recipient