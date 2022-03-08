import React from 'react';


type PriceCard = {
  numberOfCard: number,
  price: number,
  description: string,
  buyPackage: () => void,
}

const PriceCard = ({ numberOfCard, price, description, buyPackage }: PriceCard) => {
  return <div className=''>

  </div>
}

export default PriceCard;