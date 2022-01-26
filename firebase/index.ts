import { FirebaseOptions, initializeApp, getApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore, setDoc, doc, Firestore } from "firebase/firestore";
import { getAuth, connectAuthEmulator, Auth } from "firebase/auth";

interface IaddUserInfo {
  uid: string,
  firstName: string,
  lastName: string,
  howDoYouKnowUs: string,
  email: string,
}

const addUserInfo = async ({ uid, firstName, lastName, howDoYouKnowUs, email }: IaddUserInfo) => {
  try {
    await setDoc(doc(firestore, 'users', uid), {
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

const firebaseCredentials: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

const testConfig: FirebaseOptions = {
  projectId: "fakePorjectId",
  apiKey: "fakeApiKey"
}

let firebaseAuth: Auth, firestore: Firestore;
let firebaseApp;

function createFirebaseApp(config: FirebaseOptions) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

if (process.env.NEXT_PUBLIC_ENV === "development" || "test" ) {
  firebaseApp = createFirebaseApp(firebaseCredentials);
  firebaseAuth = getAuth();
  firestore = getFirestore();
  connectAuthEmulator(firebaseAuth, "http://localhost:9099", { disableWarnings: true });
  connectFirestoreEmulator(firestore, 'localhost', 8080);
} else {
  firebaseApp = createFirebaseApp(firebaseCredentials);
  firebaseAuth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);
}

export default firebaseApp;
export { firebaseAuth, firestore };