import React, { createContext, useContext, Context } from 'react';
import useFirebaseAuth from '../firebase/useFirebaseAuth';


const AuthUserContext = createContext({
  authUser: null,
  loading: true,
  magicSignInUp: async (email: string) => {},
  signOutAccount: async () => {},
  signOut: async () => {},
  afterGettingLink: async () => {}
})

interface ChildrenParams {
  children: React.ReactNode
}
export function AuthUserProvider({ children }: ChildrenParams) {
  const auth:any = useFirebaseAuth();
  return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>;
}

export const useAuth = () => useContext(AuthUserContext);