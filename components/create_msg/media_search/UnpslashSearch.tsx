/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, forwardRef } from 'react'
import ResizeObserver from "react-resize-observer";
import { createApi } from 'unsplash-js';
import ShortArrowLeft from "../../../public/icons/arrow/short_left.svg";
import UnsplashIcon from "./unsplash.svg";
import CloseIcon from '../../../public/icons/menu/close_big.svg';
import { IUnsplashSearch } from './interfaces';
import { useOnClickOutside } from '@components/utils/hooks/useClickOutside';

declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

const unsplash = createApi({
  accessKey: `${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
  fetch: fetch,
});



function UnsplashSearch({showModal, onClose, selectPhoto, mediaRef}: IUnsplashSearch) {
  const [pictures, setPictures] = useState<any>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSearchPictures = async (e: any) => {
    setSearchTerm(e.target.value)
    // TODO: api call to unsplash
  }

  const loadData = async () => {
    //TODO CALL THE DATA
    const data = await unsplash.search.getPhotos({
      query: searchTerm,
      page: 1,
      perPage: 50,
      // color: 'green',
      orientation: 'portrait',
    });
    console.log("pictures", data)
    if (data && data.response) setPictures(data.response.results);
  }


  if (!showModal) return null;

  return (
    <div className='w-full md:w-screen md:h-screen md:bg-modal md:fixed md:top-0 md:left-0 flex justify-center' data-testid="unsplashModalBg">
      <div ref={mediaRef} onClick={(e) => e.stopPropagation()} className="w-full md:bg-white md:w-[570px] md:h-[634px] rounded-12t md:flex md:flex-col md:mt-[6%] md:pb-16t">
        <div className='hidden md:flex w-full md:justify-between md:items-center p-24t'>
          <h3 className='text-title font-medium'>Rechercher une image</h3>
          <CloseIcon onClick={onClose} className="w-[24px] h-[24px] fill-black cursor-pointer" />
        </div>
        <div className="header flex items-center justify-between shadow-gif_header_shadow md:shadow-none p-16t">
          <ShortArrowLeft onClick={onClose} className="w-[24px] h-[24px] text-black mr-16t md:hidden cursor-pointer" />
          <div className="input border border-solid border-primary rounded-8t p-12t flex justify-between items-center grow bg-white">
            <input onKeyPress={(e) => {
              if (e.key === "Enter") {
                loadData();
              }
            }} onChange={(e) => handleSearchPictures(e)} type="text" className='caret-primary text-mid focus:outline-none mr-8t w-[80%]' />
            <UnsplashIcon />
          </div>
        </div>
        <div className="flex flex-wrap p-16t overflow-auto add-scrollbar">
          {pictures && pictures.map((picture: any, idx: number) => (
            // eslint-disable-next-line @next/next/no-img-element
            <div className="w-[50%] md:w-[33%] h-[130px] md:h-[164px] rounded-16t p-8t cursor-pointer flex flex-col items-start mb-8t md:mb-16t" key={idx}>
              <img onClick={() => selectPhoto && selectPhoto(picture.urls.regular)} className='rounded-16t w-[100%] h-[100%]'  src={picture.urls.thumb} alt={picture.alt_description}>
              </img>
              <span className="author bottom-0 right-0 py-4t px-8t whitespace-nowrap">
                {picture.user.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default forwardRef(UnsplashSearch);