import React from 'react';
import useFirebaseAuth from '../firebase/useFirebaseAuth';
import { db, storage } from './index';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  DocumentData,
  query,
  updateDoc,
  where
} from "firebase/firestore";

export default function useFirestore() {
  const { updateAuthDisplayName } = useFirebaseAuth();
  interface IaddUserInfo {
    uid: string,
    firstName: string,
    lastName: string,
    howDoYouKnowUs: string,
    email: string,
  }

  const addUserInfo = async ({ uid, firstName, lastName, howDoYouKnowUs, email }: IaddUserInfo) => {
    try {
      await setDoc(doc(db, 'users', uid), {
        uid,
        firstName,
        lastName,
        howDoYouKnowUs,
        email
      });
      await updateAuthDisplayName({ firstName, lastName });
    } catch (e) {
      // TODO: add snackbar to display the error here
      console.log('Error in addUserInfo to firestore', e);
    }
  }



  const getUserInfo = async (uid: string) => {
    // const db = getFirestore(firebaseApp);
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      // TODO: add snackbar to display the error here
      console.log("No such document!");
      return null;
    }
  }
  interface ICreateNewCard {
    userId: string,
    recipientName: string,
    title: string,
    hasCagnotte: boolean,
    isPremium: boolean
    teamName: string,
    photoUrl: string,
  }

  const createNewCard = async ({ userId, recipientName, title, hasCagnotte, isPremium, teamName, photoUrl="" }: ICreateNewCard) => {
    const cardRef = doc(collection(db, "cards"));
    let card;
    const cardUrl = `${window.location.origin}/card/${cardRef.id}`;
    try {
      card = await setDoc(cardRef, {
        uid: cardRef.id,
        creatorId: userId,
        recipientName,
        title,
        hasCagnotte,
        isPremium,
        teamName,
        photoUrl,
        isSent: false,
        cardUrl,
        creationDate: serverTimestamp(),
        WhoHasAlreadySeenOnce: [],
      })
      console.log("CreateNewCard: Creation sucessfull");
      return cardRef.id;
    } catch (e) {
      console.log("Error in createNewCard", e);
    }
  }

  interface IUpdateCard extends ICreateNewCard {
    cardId: string,
    isSent: string,
    WhoHasAlreadySeenOnce: string[],
  }
  const updateCard = async ({ userId, recipientName, title, hasCagnotte, isPremium, teamName, cardId, photoUrl, isSent, WhoHasAlreadySeenOnce }: IUpdateCard) => {
    WhoHasAlreadySeenOnce.push(userId);
    const cardRef = doc(db, "cards", cardId);
    const cardUrl = `${window.location.origin}/card/${cardId}`;
    try {
      await updateDoc(cardRef, {
        uid: cardId,
        creatorId: userId,
        recipientName,
        title,
        hasCagnotte,
        isPremium,
        teamName,
        photoUrl,
        isSent,
        cardUrl,
        creationDate: serverTimestamp(),
        WhoHasAlreadySeenOnce,
      })
      console.log("updateCard: Creation sucessfull");
      return cardRef.id;
    } catch (e) {
      console.log("Error in updateCard", e);
    }
  }


  const deleteCardInDB = async (uid: string) => {
    // const db = getFirestore(firebaseApp);
    try {
      console.log("Delete", uid)
      await deleteDoc(doc(db, "cards", uid));
      // TODO: Add snackbar to display success
    } catch (e) {
      console.log("Error in deleteCardInDB", e);
      // TODO: Add snackbar to display fail
    }
  }

  const getCards = async (creatorUid: string) => {
    // const db = getFirestore(firebaseApp);
    const cards: DocumentData[] = [];
    const q = query(collection(db, "cards"), where("creatorId", "==", creatorUid));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        cards.push(doc.data());
      });
      return cards;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  const getCard = async (cardId: string) => {
    const docRef = doc(db, "cards", cardId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("Cette carte n'existe pas");
    }
  }

  const getMessagesOnCard = async (cardId: string) => {
    console.log('cardId:', cardId)
    const q = query(collection(db, "messages"), where("cardId", "==", cardId));
    const messages: DocumentData[] = [];
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        messages.push(doc.data());
      });
      console.log('messages:', messages)
      return messages;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  const deleteMessage = async (uid: string) => {
    try {
      await deleteDoc(doc(db, "messages", uid));
      // TODO: Add snackbar to display success
    } catch (e) {
      console.log("Error in deleteMessage", e);
      // TODO: Add snackbar to display fail
    }
  }

  const getVideoUrl = async (storageUrl: string) => {
    try {
      const url = await getDownloadURL(ref(storage, storageUrl));
      console.log('url:', url)
      return url;
    } catch(err) {
      console.log("getVideoUrl", err);
    }
  }

  interface CreateMessage {
    docName?: string,
    docType?: "gif" | "audio" | 'image' | "video",
    file?: File,
    creatorId: string,
    message: string,
    userId: string,
    mediaUrl: string,
    creator: { name: string, familyName: string, email: string },
    cardId: string,
  }

  const createMessage = async ({ docName, docType, file, creatorId = "1234test", message, mediaUrl="", creator, cardId }: CreateMessage) => {
    const MessageRef = doc(collection(db, "messages"));
    const storageRef = ref(storage, `${docType}/${docName}`);
    console.log('storageRef:', storageRef.fullPath)
    try {
      console.log('mediaUrl:', mediaUrl)
      if (mediaUrl !== "" && !file) {
        await setDoc(MessageRef, {
          cardId,
          media: { url: mediaUrl, type: docType },
          uid: MessageRef.id,
          creatorId: creatorId,
          creationDate: serverTimestamp(),
          messageContent: message,
          creator, 
        })
      } else {
        const snapshot = await uploadBytes(storageRef, file!);
        const fullUrl =  await getDownloadURL(storageRef);
        console.log('Snapshot was uploaded !:', snapshot)
        await setDoc(MessageRef, {
          cardId,
          media: { url: fullUrl, type: docType },
          uid: MessageRef.id,
          creatorId: creatorId,
          creationDate: serverTimestamp(),
          messageContent: message,
          creator, 
        })
      }
      console.log("CreateNewMessage: Creation sucessfull");
      return MessageRef.id;
    } catch (e) {
      console.log("Error in createNewMessage", e);
    }
  }


  /** 
   * Check subcollections
   * User access: Create a different collection with users role or create a subcollection on the card 
   * with all the users that can access the data 
   */

  return {
    addUserInfo,
    getUserInfo,
    createNewCard,
    updateCard,
    deleteCardInDB,
    getCards,
    getCard,
    getMessagesOnCard,
    deleteMessage,
    createMessage,
    getVideoUrl
  }
}