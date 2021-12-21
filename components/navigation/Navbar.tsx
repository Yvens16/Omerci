import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../buttons/Button';
import Menu from '../../public/icons/menu/hamburger.svg';
import Cross from '../../public/icons/menu/close_big.svg';


const Navbar = ({ }) => {
  const [isNavOpen, setNavOpen] = useState(false);
  return (
    <>
      <nav className='flex justify-between items-center px-16t py-8t lg:py-10t relative'>
        <span>LOGO</span>
        <div className='lg:hidden'>
          {isNavOpen ? <Cross onClick={() => setNavOpen(!isNavOpen)} /> : <Menu onClick={() => setNavOpen(!isNavOpen)} />}
          {isNavOpen
            ? <div className='bg-white p-16t absolute top-full right-0 flex flex-col'>
              <ul>
                <li className='hover:text-primary'><Link href='/'>Comment ça marche</Link></li>
                <li className='hover:text-primary'><Link href='/'>Prix</Link></li>
                <li className='hover:text-primary'><Link href='/'>F.A.Q</Link></li>
                <li className='hover:text-primary'><Link href='/'>À propos</Link></li>
              </ul>
              <Button myClass='' type='primary' handleClick={() => console.log('bye')}>Connexion</Button>
            </div> : null}
        </div>
        <div className='hidden lg:flex lg:justify-between lg:items-center'>
          <span className='hover:text-primary mx-12t'><Link href='/'>Comment ça marche</Link></span>
          <span className='hover:text-primary mx-12t'><Link href='/'>Prix</Link></span>
          <span className='hover:text-primary mx-12t'><Link href='/'>F.A.Q</Link></span>
          <span className='hover:text-primary mx-12t'><Link href='/'>À propos</Link></span>
          <Button myClass='ml-36t mr-12t' type='primary' handleClick={() => console.log('bye')}>Connexion</Button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;