import React, { useState } from 'react'

type TabProps = {
  tabs: string[],
  whichIndex: (index: number) => {},
};

const Tabs = ({ tabs, whichIndex }: TabProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const getActiveIndex = (index: number): void => {
    setActiveIndex(index);
    whichIndex(index);
  }
  return (<div className='flex justify-between mb-0 h-full'>{
    tabs.map((link, index) => (
      <div className={
        `text-mid cursor-pointer font-medium	
          ${activeIndex == index ? 'text-black_login border-b-2 border-primary' : 'text-[#8F8D9A]' }
        `}
      key={index} onClick={() => getActiveIndex(index)}>{link}</div>
    ))
  }</div>);
}

export default Tabs;