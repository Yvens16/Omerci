import React, { useState, useRef, forwardRef } from 'react'
import { IGif } from "@giphy/js-types";
import ResizeObserver from "react-resize-observer";
// import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import ShortArrowLeft from "../../../public/icons/arrow/short_left.svg";
import GifyIcon from "./gifyLogo.svg";
import CloseIcon from '../../../public/icons/menu/close_big.svg';
import { IGifySearch } from './interfaces';
import { useOnClickOutside } from '@components/utils/hooks/useClickOutside';

declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

const gf = new GiphyFetch(`${process.env.NEXT_PUBLIC_GIFY_BETA_KEY}`);

function GifySearch({showModal, onClose, selectGif, mediaRef} : IGifySearch) {
  console.log(window.innerWidth)
  const [gifs, setGifs] = useState<any>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSearchGifs = async (e: any) => {
    setSearchTerm(e.target.value)
    const { data } = await gf.search(searchTerm, { sort: 'relevant', limit: 50, });
    setGifs(data);
  }
  const getGifUrl = (gif: IGif): string => {
    if (gif.images.preview_webp && gif.images.preview_webp.url) return gif.images.preview_webp.url;
    if (gif.images.preview_gif && gif.images.preview_gif.url) return gif.images.preview_gif.url;
    if (gif.images.preview && gif.images.preview.url) return gif.images.preview.url;
    return "";
  }

  if (!showModal) return null;

  return (
    <div className='w-full md:w-screen md:h-screen md:bg-modal md:fixed md:top-0 md:left-0 flex justify-center'>
      <div ref={mediaRef} onClick={(e) => e.stopPropagation()} className="w-full md:bg-white md:w-[570px] md:h-[634px] rounded-12t md:flex md:flex-col md:mt-[6%] md:pb-16t">
        <div className='hidden md:flex w-full md:justify-between md:items-center p-24t'>
          <h3 className='text-title font-medium'>Rechercher un GIF</h3>
          <CloseIcon onClick={onClose} className="w-[24px] h-[24px] fill-black cursor-pointer" />
        </div>
        <div className="header flex items-center justify-between shadow-gif_header_shadow md:shadow-none p-16t">
          <ShortArrowLeft onClick={onClose} className="w-[24px] h-[24px] text-black mr-16t md:hidden cursor-pointer" />
          <div className="input border border-solid border-primary rounded-8t p-12t flex justify-between items-center grow bg-white">
            <input onChange={(e) => handleSearchGifs(e)} type="text" className='caret-primary text-mid focus:outline-none mr-8t' />
            <GifyIcon />
          </div>
        </div>
        <div className="flex flex-wrap p-16t overflow-auto add-scrollbar">
          {gifs && gifs.map((gif: IGif, idx: number) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img onClick={() => selectGif && selectGif(getGifUrl(gif))} className="w-[50%] md:w-[33%] h-[130px] md:h-[164px] rounded-16t p-8t cursor-pointer" src={getGifUrl(gif)} key={idx} alt={gif.title}>
            </img>
          ))}
        </div>
      </div>
    </div>
  )
}

export default forwardRef(GifySearch)