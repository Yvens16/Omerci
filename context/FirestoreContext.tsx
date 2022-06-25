import { createContext, useContext } from 'react';
import useFirestore from '../firebase/useFirestore';

type TResul = {
  firstName: string,
  email: string,
  lastName: string,
}
interface ICreateNewCard {
  userId: string, recipientName: string, title: string, hasCagnotte: boolean, isPremium: boolean, teamName: string,
  creatorName: string,
}
interface IUpdatecard extends ICreateNewCard {
  cardId: string,
}
type TcardsData = {
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

type Tcard = {
  uid: string,
  photoUrl: string,
  title: string,
  creationDate: string,
  recipientName: string,
  messageNumber: number,
  money: number,
  url: string,
  isSent: boolean,
  WhoHasAlreadySeenOnce: [],
  messagesId: [],
}

type TMessages = {
  ownerName: string,
  mediaUrl: string,
  text: string,
}
interface CreateMessage {
  docName?: string,
  docType?: "gif" | "audio" | 'image' | "video",
  file?: File,
  creatorId: string,
  message: string,
  gifyUrl?: string,
  unsplashUrl?: string,
  mediaUrl?: string,
  creator: { name: string, familyName: string, email: string },
  cardId: string,
}
interface IfirestoreContext {
  addUserInfo: ({ uid, firstName, lastName, howDoYouKnowUs, email }: { uid: string, firstName: string, lastName: string, howDoYouKnowUs: string, email: string }) => Promise<void>,
  getUserInfo: (uid: string) => Promise<TResul>,
  createNewCard: ({ userId, recipientName, title, hasCagnotte, isPremium, teamName, creatorName }: ICreateNewCard) => Promise<void>,
  updateCard: ({ userId, recipientName, title, hasCagnotte, isPremium, teamName, cardId }: IUpdatecard) => Promise<void>,
  deleteCardInDB: (uid: string) => Promise<void>,
  deleteMessage: (uid: string) => Promise<void>,
  getCards: (creatorUid: string) => Promise<TcardsData>,
  getCard: (cardId: string) => Promise<Tcard>,
  getMessagesOnCard: (cardId: string) => Promise<TMessages>,
  createMessage: ({docName, docType, file, creatorId, message, mediaUrl, creator, cardId}: CreateMessage) =>Promise<void>,
  getVideoUrl: (storageUrl: string) => Promise<void>,
}

export const FirestoreCtx = createContext<IfirestoreContext>({
  addUserInfo: async () => {},
  getUserInfo: async (uid: string) => new Promise<TResul>(() => { }),
  createNewCard: async ({userId, recipientName, title, hasCagnotte, isPremium, teamName, creatorName}: ICreateNewCard) => new Promise<void>(() => { }),
  updateCard: async ({userId, recipientName, title, hasCagnotte, isPremium, teamName, cardId}: IUpdatecard) => new Promise<void>(() => { }),
  deleteCardInDB: async(uid:string) => new Promise(() => {}),
  deleteMessage: async(uid:string) => new Promise(() => {}),
  getCards: (creatorUid: string) => new Promise<TcardsData>(() => {}),
  getCard: (cardId: string) => new Promise<Tcard>(() => {}),
  getMessagesOnCard: (creatorUid: string) => new Promise<TMessages>(() => {}),
  createMessage: ({docName, docType, file, creatorId, message, mediaUrl, creator, cardId}: CreateMessage) => new Promise(() => {}),
  getVideoUrl: (storageUrl: string) => new Promise(() => {})
})


interface IChildrenParams {
  children: React.ReactNode
}

export function FirestoreProvider({ children }: IChildrenParams) {
  const firestore: any = useFirestore();
  return <FirestoreCtx.Provider value={firestore}>{children}</FirestoreCtx.Provider>
}

export const useFirestoreDb = () => useContext(FirestoreCtx);