import React from 'react';
import firebaseApp from './index';
import useFirebaseAuth from '../firebase/useFirebaseAuth';
import { getFirestore, setDoc, doc, getDoc, serverTimestamp, addDoc, collection } from "firebase/firestore";

export default function useFirestore() {
  const { updateAuthDisplayName } = useFirebaseAuth();
  interface IaddUserInfo {
    uid: string,
    firstName: string,
    lastName: string,
    howDoYouKnowUs: string,
    email: string,
  }

  const addUserInfo = async ({uid, firstName, lastName, howDoYouKnowUs, email}:IaddUserInfo) => {
    const db = getFirestore(firebaseApp);
    try {
      await setDoc(doc(db, 'users', uid), {
        uid,
        firstName,
        lastName,
        howDoYouKnowUs,
        email
      });
      await updateAuthDisplayName({firstName, lastName});
    } catch (e) {
      // TODO: add snackbar to display the error here
      console.log('Error in addUserInfo to firestore', e);
    }
  }



  const getUserInfo = async (uid: string) => {
    const db = getFirestore(firebaseApp);
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
  }

  const createNewCard = async ({userId, recipientName, title, hasCagnotte, isPremium, teamName}: ICreateNewCard) => {
    const db = getFirestore(firebaseApp);
    try {
      await addDoc(collection(db, 'cards'), {
        uid: "", //todo: add uid here
        creatorId: userId,
        recipientName,
        title,
        hasCagnotte,
        isPremium,
        teamName,
        creationDate: serverTimestamp(),
      })
      console.log("CreateNewCard: Creation sucessfull");
    } catch (e) {
      console.log("Error in createNewCard", e);
    }
  }

  return {
    addUserInfo,
    getUserInfo,
    createNewCard,
  }
}