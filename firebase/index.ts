import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import 'firebase/auth'
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";


const firebaseCredentials = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId:process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

let firebaseApp: FirebaseApp;
if (!getApps().length) firebaseApp = initializeApp(firebaseCredentials);
else firebaseApp = getApp();

if (location.hostname === "localhost") {
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, 'localhost', 8080);
} 

export default firebaseApp;