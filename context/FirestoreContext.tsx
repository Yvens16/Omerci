import { createContext, useContext } from 'react';
import useFirestore from '../firebase/useFirestore';

type TResul = {
  email: string,
  firstName: string,
  lastName: string,
}
interface IfirestoreContext {
  addUserInfo: ({uid, firstName, lastName, howDoYouKnowUs, email}: {uid: string, firstName: string, lastName: string, howDoYouKnowUs: string, email:string}) => Promise<void>,
  getUserInfo: (uid: string) => Promise<TResul>,
}

export const FirestoreCtx = createContext<IfirestoreContext>({
  addUserInfo: async() => {},
  getUserInfo: async(uid:string) => new Promise<TResul>(() => {}),

})

interface IChildrenParams {
  children: React.ReactNode
}

export function FirestoreProvider({children}: IChildrenParams) {
  const firestore: any = useFirestore();
  return <FirestoreCtx.Provider value={firestore}>{children}</FirestoreCtx.Provider>
}

export const useFirestoreDb = () => useContext(FirestoreCtx);