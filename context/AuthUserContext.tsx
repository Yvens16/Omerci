import React, { createContext, useContext, Context } from 'react';
import useFirebaseAuth from '../firebase/useFirebaseAuth';


const AuthUserContext = createContext({
  authUser: null,
  loading: true,
  magicSignInUp: async (email: string, isAnonymous?: boolean) => {},
  signOutAccount: async () => {},
  signOut: async () => {},
  afterGettingLink: async () => {},
  updateAuthDisplayName: async () => Promise,
  doesEmailAlreadyExist: async (email: string) => new Promise<boolean>(() => {}),
  anonymousSignIn: async() => Promise,
})

interface ChildrenParams {
  children: React.ReactNode
}
export function AuthUserProvider({ children }: ChildrenParams) {
  const auth:any = useFirebaseAuth();
  return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>;
}

export const useAuth = () => useContext(AuthUserContext);