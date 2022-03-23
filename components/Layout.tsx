import React from 'react';
import Navbar from "./navigation/Navbar"

export default function Layout({ children }: any) {
  return (
    <div className='relative min-h-screen'>
      <Navbar />
      <main className='bg-default_bg'>{children}</main>
      {/* <main className='bg-default_bg pb-[15%]'>{children}</main> if footer needed */}
      {/* <footer className='bg-primary absolute bottom-0 w-full min-h-[15%]'>
        <h1>Footer</h1>
        <h1>Footer</h1>
        <h1>Footer</h1>
        <h1>Footer</h1>
      </footer> */}
    </div>
  )
}