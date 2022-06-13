import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Button from '@components/buttons/Button';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CheckoutForm({ onFileUpload, clientSecret, isAmountSelected }: { onFileUpload: () => void, clientSecret: string, isAmountSelected: boolean }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const acceptPayment = async () => {
    if (!stripe || !elements || !clientSecret) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);
    const cardElement = elements.getElement(CardNumberElement);

    if (cardElement) {
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement
        }
      });
      if (error) {
        setMessage(`Payment failed ${error.message}`);
        return toast(`Paiement échoué parce que ${error.message}`)
      } else {
        setMessage(null);
        return toast("Paiement réussie")
      }
    }

    setIsLoading(false);
  }
  useEffect(() => {
    if (!stripe) {
      return;
    }

    // const clientSecret = new URLSearchParams(window.location.search).get(
    //   "payment_intent_client_secret"
    // );
    // console.log('clientSecret: useEffect', clientSecret)

    // if (!clientSecret) {
    //   return;
    // }

    // stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
    //   if (paymentIntent)
    //     switch (paymentIntent.status) {
    //       case "succeeded":
    //         setMessage("Payment succeeded!");
    //         console.log("bybybyby")
    //         toast("Payment succeeded!");
    //         break;
    //       case "processing":
    //         setMessage("Your payment is processing.");
    //         toast("Your payment is processing.");
    //         break;
    //       case "requires_payment_method":
    //         setMessage("Your payment was not successful, please try again.");
    //         toast("Your payment was not successful, please try again.");
    //         break;
    //       default:
    //         setMessage("Something went wrong.");
    //         toast("Something went wrong.");
    //         break;
    //     }
    //   // return toast(message);
    // });
  }, [stripe, message]);
  return (
    <>
      {isAmountSelected ?
        <div className="mb-40t w-full xl:flex xl:justify-between xl:w-[60%]">
          <div className='w-full md:w-auto mb-8t md:mb-0'>
            <label className='mb-4t' htmlFor="">Numéro de carte</label>
            <CardNumberElement id="card-number-element" className='min-w-[220px] min-h-auto border border-solid border-input_default rounded-8t py-8t px-16t' /></div>
          <div className='w-full md:w-auto mb-8t md:mb-0 xl:mx-8t'>
            <label className='mb-4t' htmlFor="">Expiration</label>
            <CardExpiryElement id="card-expiry-element" className='min-w-[220px] min-h-auto border border-solid border-input_default rounded-8t py-8t px-16t' /></div>
          <div className='w-full md:w-auto'>
            <label className='mb-4t' htmlFor="">CVC</label>
            <CardCvcElement id="card-cvc-Element" className='min-w-[220px] min-h-auto border border-solid border-input_default rounded-8t py-8t px-16t' /></div>
        </div>
        : null}
      <div className="buttons w-full flex justify-between mb-12t xl:max-w-laptopContent xl:mx-auto 2xl:max-w-content">
        <Button myClass={'mr-12t'} handleClick={() => console.log("HEllo")} type={'secondary'} size={'big'}>Annuler</Button>
        <Button myClass={''} handleClick={() => {
          acceptPayment();
          // onFileUpload();
        }} type={'primary'} size={'big'}>Ajouter le message</Button>
      </div>
      <ToastContainer />
    </>
  )
}

export default CheckoutForm