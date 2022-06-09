import React from 'react'
import StreamIcon from "../../../public/icons/arrow/stream_arrow.svg";
import Input from '@components/inputs/Input';


const sections = [
  {
    title: "Le destinataire",
    inputs: [
      { name: "name", placeholder: "Jean Dujardin", labelText: "Nom du destinataire" },
      { name: "email", placeholder: "jeandujardin@gmail.com", labelText: "Email du destinataire" },
      { name: "name", placeholder: "jeandujardin@gmail.com", labelText: "Comfirmation de l’email du destinataire" },
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
function Recipient() {
  return (
    <div className='max-w-laptopContent mx-auto'>
      {sections.map((section, idx) => (
        <div className={`${idx === 1 ? "grid grid-cols-4" 
          : ""} xl:grid xl:grid-rows-3 gap-[16px] xl:gap-y-0 border border-solid border-secondary_fill rounded-8t p-16t`} key={idx}>
          <div className='text-primary flex items-center mb-24t text-mid font-semibold col-span-4'>
            <StreamIcon className="w-[14px] h-[14px] mr-8t" />
            {section.title}
          </div>
          {section.inputs.map((input, index) => (
            <div key={index}
              className={`
              ${idx === 1 && (index === 2 || index === 3) && "col-span-2"}
              ${idx === 1 && (index === 0 || index === 1) && "col-span-4"}
              ${idx === 1 && index === 1 && "xl:col-span-2"}
              ${idx === 1 && index === 2 && "xl:col-span-1"}
              ${idx === 1 && index === 3 && "xl:col-span-1"}
              ${idx ===0 && index === 0 && "col-start-1 col-end-3"}
              ${idx === 0 && index === 1 && "col-start-1 col-end-3"}
              ${idx === 0 && index === 2 && "col-start-3 col-end-5"}
              mb-16t`
              }>
              <Input label={input.labelText} placeholder={input.placeholder} handleChange={() => console.log("Hello")} name={input.name} infoMessage={''} />
            </div>
          ))}
        </div>
        // ${idx == 0 && index === 0 && "col-span-2"}
      ))}
    </div>
  )
}

export default Recipient