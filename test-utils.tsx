import React, {FC, ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import { AuthUserProvider } from './context/AuthUserContext'
import { FirestoreProvider } from './context/FirestoreContext'

const AllTheProviders: FC = ({children}) => {
  return (
    <AuthUserProvider>
      <FirestoreProvider>
      {children}
      </FirestoreProvider>
    </AuthUserProvider>
  );
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react'
export {customRender}
// export {customRender as render}