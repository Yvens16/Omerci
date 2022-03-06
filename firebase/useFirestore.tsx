import React from 'react';
import firebaseApp from './index';  
import { getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
    deleteDoc } from "firebase/firestore";

export default function useFirestore() {
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
      console.log('docSnap:', docSnap)
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  }

  const deleteCard = async (uid: string) => {
    const db = getFirestore(firebaseApp);
    try {
      await deleteDoc(doc(db, "cards", uid));
      // TODO: Add snackbar to display success
    } catch(e) {
      console.log("Error in deleteCard", e);
      // TODO: Add snackbar to display fail
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
    deleteCard,
  }
}