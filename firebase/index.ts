import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
// import 'firebase/auth'
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";


let environment = process.env.NEXT_PUBLIC_VERCEL_ENV;
console.log('environment:', environment)
const firebaseCredentials = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:environment === "development" ? "demo-omerci" : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:environment === "development" ? "demo-omerci.appspot.com" : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId:process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

let db: any, auth: any, storage: any;

let firebaseApp: FirebaseApp;
if (!getApps().length) firebaseApp = initializeApp(firebaseCredentials);
else firebaseApp = getApp();

db = getFirestore(firebaseApp);
auth = getAuth(firebaseApp);
storage = getStorage(firebaseApp);
if (environment === "development") {
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, 'localhost', 8181);
  connectStorageEmulator(storage, "localhost", 9199);
} 
export default firebaseApp;
export {
  auth,
  db,
  storage
}