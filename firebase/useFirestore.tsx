import React from 'react';
import firebaseApp from './index';  
import { getFirestore, collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";

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

  return {
    addUserInfo,
    getUserInfo,
  }
}