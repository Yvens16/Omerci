import React, { createContext, useContext, Context } from 'react';
import useFirebaseAuth from '../firebase/useFirebaseAuth';


interface IAuthContext {
  authUser: null | {
    email: string,
    emailVerified: string,
    firstName: string,
    isAnonymous: string,
    lastName: string,
    photoUrl: string | undefined,
    uid: string,
  },
  loading: boolean,
  magicSignInUp: (email: string, isAnonymous?: boolean) => Promise<void>,
  signOutAccount:  () => Promise<void>,
  signOut:  () => Promise<void>,
  afterGettingLink:  () => Promise<void>,
  updateAuthDisplayName:  () => Promise<void>,
  doesEmailAlreadyExist:  (email: string) =>Promise<boolean>,
  anonymousSignIn:  () => Promise<void>,
  signInAnonymousUser: (email: string, emailLink: string) => Promise<void>,
  linkAnonymousUser: (email: string, emailLink: string) => Promise<void>,
}
const AuthUserContext = createContext<IAuthContext>({
  authUser: null,
  loading: true,
  magicSignInUp: async (email: string, isAnonymous?: boolean) => { },
  signOutAccount: async () => { },
  signOut: async () => { },
  afterGettingLink: async () => { },
  updateAuthDisplayName: async () => new Promise(() => {}),
  doesEmailAlreadyExist: async (email: string) => new Promise<boolean>(() => { }),
  anonymousSignIn: async () => new Promise(() => {}),
  signInAnonymousUser: async (email: string, emailLink: string) => new Promise(() => {}),
  linkAnonymousUser: async (email: string, emailLink: string) => new Promise(() => {}),
})

interface ChildrenParams {
  children: React.ReactNode
}
export function AuthUserProvider({ children }: ChildrenParams) {
  const auth: any = useFirebaseAuth();
  return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>;
}

export const useAuth = () => useContext(AuthUserContext);