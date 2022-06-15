import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Button from '../buttons/Button';
import Menu from '../../public/icons/menu/hamburger.svg';
import Cross from '../../public/icons/menu/close_big.svg';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthUserContext';
import Image from 'next/image';
import DashboardIcon from '../../public/icons/menu/dashboard.svg';
import SettingsIcon from '../../public/icons/misc/settings.svg';
import OffCloseIcon from "../../public/icons/misc/off_close.svg";
import UserProfilePicture from "../../public/icons/user/user_profile_picture.svg";
import { useOnClickOutside } from '@components/utils/hooks/useClickOutside';


const Navbar = ({ }) => {
  const { authUser, signOutAccount } = useAuth();
  const router = useRouter();
  const [isNavOpen, setNavOpen] = useState(false);
  const [isMoreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);
  useOnClickOutside(moreRef, () => setMoreOpen(false));
  useOnClickOutside(mobileNav, () => setNavOpen(false));
  return (
    <nav className='bg-white'>
      {console.log(isMoreOpen)}
      <div className='flex justify-between items-center px-16t xl:px-0 py-8t lg:py-10t relative lg:h-[73px] max-w-content mx-auto'>
        <span>LOGO</span>
        <div className='lg:hidden'>
          {isNavOpen
            ? <div ref={mobileNav}>
              <Cross onClick={() => setNavOpen(!isNavOpen)} />
              <div  className="absolute top-full right-0">
                <div className='bg-white p-16t flex flex-col'>
                  <Button myClass='nav font-base mt-8t' type='third' size='' handleClick={() => console.log('button1')}><Link href='/'>Comment ça marche</Link></Button>
                  <Button myClass='nav font-base mt-8t !justify-start' type='third' size='' handleClick={() => console.log('button2')}><Link href='/'>Prix</Link></Button>
                  <Button myClass='nav font-base mt-8t !justify-start' type='third' size='' handleClick={() => console.log('button3')}><Link href='/'>F.A.Q</Link></Button>
                  <Button myClass='nav font-base mt-8t !justify-start' type='third' size='' handleClick={() => console.log('button4')}><Link href='/'>À propos</Link></Button>
                  {!authUser ?
                    <>
                      <Button myClass='mt-8t' type='primary' size='' handleClick={() => router.push('/login')}>Connexion</Button>
                    </>
                    : <>
                      <hr className='border border-solid border-input_default mb-8t' />
                      <div className='flex justify-start items-center'>
                        <div className='mb-8t w-[30px] h-[30px] relative rounded-[50%] md:mr-8t md:mb-0 md:min-w-[30px] mr-8t border-[2px] border-solid border-primary'>
                          <Image className={`img_avatar`} src={'/avatars/girl.jpg'} alt={`avatar}`} layout="fill" objectFit="cover" />
                          <style jsx global>{`
                          .img_avatar {
                            border-radius: 16px;
                          }
                        `}</style>
                        </div>
                        <div className='grid grid-rows-2'>
                          <span className='text-black font-medium text-14t'>
                            {authUser["firstName"]} {authUser["lastName"]}
                          </span>
                          <span className='text-third text-12t'>{authUser["email"]}</span>
                        </div>
                      </div>
                      <Button myClass='nav font-base mt-8t !justify-start' type='third' size='' handleClick={() => console.log('button1')}>
                        <DashboardIcon className="mr-4t" />
                        <Link href='/'>
                          Dashboard</Link>
                      </Button>
                      <Button myClass='nav font-base mt-8t !justify-start' type='third' size='' handleClick={() => console.log('button1')}>
                        <SettingsIcon className="mr-4t" />
                        <Link href='/'>
                          Parametre compte</Link>
                      </Button>
                      <Button myClass='nav font-base mt-8t !justify-start' type='third' size='' handleClick={() => console.log('button1')}>
                        <OffCloseIcon className="mr-4t" />
                        <Link href='/'>
                          Déconnexion</Link>
                      </Button>
                    </>
                  }
                </div>
              </div></div> : <Menu onClick={() => setNavOpen(!isNavOpen)} />}
        </div>
        <div className='hidden lg:flex lg:justify-between lg:items-center'>
          <Button myClass='nav font-base' type='third' size='' handleClick={() => console.log('button1')}><Link href='/'>Comment ça marche</Link></Button>
          <Button myClass='nav font-base' type='third' size='' handleClick={() => console.log('button2')}><Link href='/'>Prix</Link></Button>
          <Button myClass='nav font-base' type='third' size='' handleClick={() => console.log('button3')}><Link href='/'>F.A.Q</Link></Button>
          <Button myClass='nav font-base' type='third' size='' handleClick={() => console.log('button4')}><Link href='/'>À propos</Link></Button>
          {authUser ?
            <div className='relative' ref={moreRef}>
              <UserProfilePicture onClick={() => setMoreOpen((prevstate) => !prevstate)} className="cursor-pointer" />
              {isMoreOpen ? <div className='absolute grdi justify-center top-[68px] right-0 w-[200px] p-16t rounded-12t grid grip-y-[8px] bg-white border boorder-solid border-secondary_fill'>
                <Button myClass='nav font-base mt-8t !justify-start' type='third' size='' handleClick={() => console.log('button1')}>
                  <DashboardIcon className="mr-4t" />
                  <Link href='/'>
                    Dashboard</Link>
                </Button>
                <Button myClass='nav font-base mt-8t !justify-start' type='third' size='' handleClick={() => console.log('button1')}>
                  <SettingsIcon className="mr-4t" />
                  <Link href='/'>
                    Parametre compte</Link>
                </Button>
                <Button myClass='nav font-base mt-8t !justify-start' type='third' size='' handleClick={() => console.log('button1')}>
                  <OffCloseIcon className="mr-4t" />
                  <Link href='/'>
                    Déconnexion</Link>
                </Button>
              </div> : null}
            </div>
            : <Button myClass='ml-36t mr-12t lg:mr-0' type='primary' size='' handleClick={() => router.push('/login')}>Connexion</Button>}
        </div>
      </div>
    </nav >
  );
}

export default Navbar;