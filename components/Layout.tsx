import React from 'react';
import Navbar from "./navigation/Navbar"

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main className='bg-default_bg'>{children}</main>
    </>
  )
}