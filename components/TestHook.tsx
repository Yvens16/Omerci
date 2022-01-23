import React from 'react';
import {render} from '@testing-library/react';


function TestHook({callback}: {callback: Function}) {
  callback();
  return null;
}


const testHook = (callback: Function) => {
  render(<TestHook callback={callback}/>)
}

export default testHook;

