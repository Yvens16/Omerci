import React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Input from '../components/inputs/Input';
import Navbar from '@components/navigation/Navbar';
// import Ba from '../public/icons/menu/hamburger.svg';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Ba/> */}
      <Navbar/>
      {/* <Button myClass={''} type='primary' size='' handleClick={() => console.log('hi')}>
        <>
          <BrandIcon className='fill-white mr-2'/>
          <span className=''>Delete</span>
        </>
      </Button> */}
      {/* <Input name=''label='Hello' placeholder='bonjour' infoMessage='' handleChange={() => console.log('Hello')}/> */}
    </>
  )
}

export default Home