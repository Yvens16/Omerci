import React from 'react';
import useFirebaseAuth from '../firebase/useFirebaseAuth';
import {db} from './index';  
import { getFirestore,
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
    where} from "firebase/firestore";

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
    // const db = getFirestore(firebaseApp);
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
    console.log('getUserInfo: UID', uid)
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
  }

  const createNewCard = async ({userId, recipientName, title, hasCagnotte, isPremium, teamName}: ICreateNewCard) => {
    // const db = getFirestore(firebaseApp);
    const cardRef = doc(collection(db, "cards"));
    const cardUrl = `${window.location.origin}/card/${cardRef.id}`;
    try {
      await setDoc(cardRef, {
        uid: cardRef.id,
        creatorId: userId,
        recipientName,
        title,
        hasCagnotte,
        isPremium,
        teamName,
        photoUrl: '',
        isSent: false,
        cardUrl,
        creationDate: serverTimestamp(),
      })
      console.log("CreateNewCard: Creation sucessfull");
    } catch (e) {
      console.log("Error in createNewCard", e);
    }
  }
  const deleteCardInDB = async (uid: string) => {
    // const db = getFirestore(firebaseApp);
    try {
      console.log("Delete", uid)
      await deleteDoc(doc(db, "cards", uid));
      // TODO: Add snackbar to display success
    } catch(e) {
      console.log("Error in deleteCardInDB", e);
      // TODO: Add snackbar to display fail
    }
  }

  const getCards = async (creatorUid:string) => {
    // const db = getFirestore(firebaseApp);
    const cards: DocumentData[] = [];
    const q = query(collection(db, "cards"), where("creatorId", "==", creatorUid));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        cards.push(doc.data());
      });
      return cards;
    } catch(e: any) {
      throw new Error(e);
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
    deleteCardInDB,
    getCards
  }
}