import { createContext, useContext } from 'react';
import useFirestore from '../firebase/useFirestore';

type TResul = {
  firstName: string,
  email: string,
  lastName: string,
}
interface ICreateNewCard {
  userId: string, recipientName: string, title: string, hasCagnotte: boolean, isPremium: boolean, teamName: string
}
type cardsData = {
  uid: string,
  photoUrl: string,
  title: string,
  creationDate: string,
  recipientName: string,
  messageNumber: number,
  money: number,
  url: string,
  isSent: boolean
}[]
interface IfirestoreContext {
  addUserInfo: ({ uid, firstName, lastName, howDoYouKnowUs, email }: { uid: string, firstName: string, lastName: string, howDoYouKnowUs: string, email: string }) => Promise<void>,
  getUserInfo: (uid: string) => Promise<TResul>,
  createNewCard: ({ userId, recipientName, title, hasCagnotte, isPremium, teamName }: ICreateNewCard) => Promise<void>
  deleteCardInDB: (uid: string) => Promise<void>,
  getCards: (creatorUid: string) => Promise<cardsData>,
}

export const FirestoreCtx = createContext<IfirestoreContext>({
  addUserInfo: async () => { },
  getUserInfo: async (uid: string) => new Promise<TResul>(() => { }),
  createNewCard: async ({userId, recipientName, title, hasCagnotte, isPremium, teamName}: ICreateNewCard) => new Promise<void>(() => { }),
  deleteCardInDB: async(uid:string) => new Promise(() => {}),
  getCards: (creatorUid: string) => new Promise<cardsData>(() => {}),
})


interface IChildrenParams {
  children: React.ReactNode
}

export function FirestoreProvider({ children }: IChildrenParams) {
  const firestore: any = useFirestore();
  return <FirestoreCtx.Provider value={firestore}>{children}</FirestoreCtx.Provider>
}

export const useFirestoreDb = () => useContext(FirestoreCtx);