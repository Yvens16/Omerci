import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../buttons/Button';
import Menu from '../../public/icons/menu/hamburger.svg';
import Cross from '../../public/icons/menu/close_big.svg';


const Navbar = ({ }) => {
  const [isNavOpen, setNavOpen] = useState(false);
  return (
    <nav className='bg-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.03)] lg:drop-shadow-none'>
      <div className='flex justify-between items-center px-16t xl:px-0 py-8t lg:py-10t relative lg:h-[73px] max-w-content mx-auto'>
        <span>LOGO</span>
        <div className='lg:hidden'>
          {isNavOpen ? <Cross onClick={() => setNavOpen(!isNavOpen)} /> : <Menu onClick={() => setNavOpen(!isNavOpen)} />}
          {isNavOpen
            ? <div className='bg-white p-16t absolute top-full right-0 flex flex-col'>
              <Button myClass='nav font-base mt-8t' type='third' size='' handleClick={() => console.log('button1')}><Link href='/'>Comment ça marche</Link></Button>
              <Button myClass='nav font-base mt-8t' type='third' size='' handleClick={() => console.log('button2')}><Link href='/'>Prix</Link></Button>
              <Button myClass='nav font-base mt-8t' type='third' size='' handleClick={() => console.log('button3')}><Link href='/'>F.A.Q</Link></Button>
              <Button myClass='nav font-base mt-8t' type='third' size='' handleClick={() => console.log('button4')}><Link href='/'>À propos</Link></Button>
              <Button myClass='mt-8t' type='primary' size='' handleClick={() => console.log('bye')}>Connexion</Button>
            </div> : null}
        </div>
        <div className='hidden lg:flex lg:justify-between lg:items-center'>
          <Button myClass='nav font-base' type='third' size='' handleClick={() => console.log('button1')}><Link href='/'>Comment ça marche</Link></Button>
          <Button myClass='nav font-base' type='third' size='' handleClick={() => console.log('button2')}><Link href='/'>Prix</Link></Button>
          <Button myClass='nav font-base' type='third' size='' handleClick={() => console.log('button3')}><Link href='/'>F.A.Q</Link></Button>
          <Button myClass='nav font-base' type='third' size='' handleClick={() => console.log('button4')}><Link href='/'>À propos</Link></Button>
          <Button myClass='ml-36t mr-12t' type='primary' size='' handleClick={() => console.log('bye')}>Connexion</Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;