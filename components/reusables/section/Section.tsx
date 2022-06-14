import React from 'react'
import { ISection } from '../interfaces';
import StreamIcon from "../../../public/icons/arrow/stream_arrow.svg";

function Section({ title, children }: ISection) {
  return (
    <div
      className='email_settings border border-solid border-secondary_fill rounded-8t p-16t m-16t xl:max-w-laptopContent mx-auto'>
      <div className='text-primary flex items-center mb-24t text-mid font-semibold'>
        <StreamIcon className="w-[14px] h-[14px] mr-8t" />
        {title}
      </div>
      {children}
    </div>
  )
}

export default Section;