import React, { useState } from 'react'
import useSWR from 'swr'
import CircleChevron from "../../../public/icons/circle_arrow.svg"
import Input from '@components/inputs/Input'
import Button from '@components/buttons/Button'
import CheckoutForm from './CheckoutForm'
import { ICagnotte } from './interfaces'
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, PaymentElement } from '@stripe/react-stripe-js';




// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const load = async() => {
//   const stripePromise = await loadStripe('pk_test_51L3zpUK42ibxgcF9SPEq4Owlqf8X40AW4O4BHeOX1XoQ77Cn5WLcSTnAvUJKUb51cXZxlXFtXr9nvzBvsfeqhT3G00X4sNwXDf'); 
//   console.log('stripePromise:', stripePromise)
// }
// load();
export function Cagnotte({ isCustomAmount, isAmountSelected, commissionValue, handleCagnotteAmount, stripeOption, handleCustomAmount, cagnotteAmount, stripePromise, onFileUpload, clientSecret, reset }: ICagnotte) {
  return (
    <div className='rounded-8t border border-solid border-secondary_fill p-16t xl:max-w-laptopContent xl:mx-auto 2xl:max-w-content'>
      <div className="header flex items-center mb-24t">
        <CircleChevron className="fill-primary w-[14px] h-[14px] mr-8t" />
        <h4 className='text-primary text-mid font-medium'>Ajouter à la cagnotte</h4>
      </div>
      <div className="prices flex w-[100%] mb-8t">
        <div className='flex lg:basis-1/2 grow'>
          <Button myClass={'focus:bg-primary focus:text-white'} handleClick={() => handleCagnotteAmount(5)} type='secondary' size={''}>
            5 €
          </Button>
          <Button myClass={'mx-8t focus:bg-primary focus:text-white'} handleClick={() => handleCagnotteAmount(10)} type='secondary' size={''}>
            10 €
          </Button>
          <Button myClass={'mr-8t focus:bg-primary focus:text-white'} handleClick={() => handleCagnotteAmount(20)} type='secondary' size={''}>
            20 €
          </Button>
        </div>
        <div className='lg:basis-1/2 grow'>
          {isCustomAmount
            ?
            <Input customInputClass='!my-0 !w-full' label={''} value={cagnotteAmount.toString()} placeholder='120 €' handleChange={handleCagnotteAmount} name={''} infoMessage={''} />
            : <Button myClass={'!w-full'} handleClick={handleCustomAmount} type='secondary' size={''}>
              Custom
            </Button>}
        </div>
      </div>
      {/* TODO: Change commission value to be dynamic */}
      <span className='text-third text-14t'>The recipient does not see individual contributions. The total amount you pay will include a processing fee of  <span className='font-semibold'>0,46 €</span> . For more info, visit our FAQs.</span>
      <div className='stripe_card_inputs mt-16t'>
        {/* <Elements stripe={stripePromise} options={options} key={options.clientSecret}
            To avoid update of the clientSecret in certain situation
            https://githubhot.com/repo/stripe/react-stripe-js/issues/246
            https://stripe.com/docs/js/elements_object/fetch_updates
          */}
        {/* options={stripeOption} key={stripeOption.clientSecret}: if using paymentElements */}
        {/* <Elements stripe={stripePromise}>
          <div className='flex w-full justify-between flex-wrap'>
            <CheckoutForm isAmountSelected={isAmountSelected} onFileUpload={onFileUpload} clientSecret={clientSecret} />
          </div>
        </Elements> */}
        <div className="buttons w-full flex justify-between mb-12t xl:max-w-laptopContent xl:mx-auto 2xl:max-w-content">
          <Button myClass={'mr-12t'} handleClick={reset} type={'secondary'} size={'big'}>Annuler</Button>
          <Button myClass={''} handleClick={() => {
            // acceptPayment();
            onFileUpload();
          }} type={'primary'} size={'big'}>Ajouter le message</Button>
        </div>
      </div>

    </div>
  )
}
