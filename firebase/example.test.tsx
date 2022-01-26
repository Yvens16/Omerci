/**
 * @jest-environment node
 */
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from "@firebase/rules-unit-testing"
import { readFileSync } from 'fs';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { firestore, firebaseAuth } from './index';



interface IaddUserInfo {
  uid: string,
  firstName: string,
  lastName: string,
  howDoYouKnowUs: string,
  email: string,
}

let testEnv: RulesTestEnvironment;


beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "demo-project-1234",
    firestore: {
      host: "localhost",
      port: 8080,
      rules: readFileSync("firestore.rules", "utf8"),
    },
  });
})

afterAll(async () => {
  await testEnv.cleanup();
})

beforeEach(async () => {
  await testEnv.clearFirestore();
})

test("Sample test", async () => {
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
  await addUserInfo({ uid: "testFadel", firstName: "Alice", lastName: "Debarge", howDoYouKnowUs: "facebook", email: "bla@gmail.com" });
  const docRef = doc(firestore, "users", "testFadel");
  const docSnap = await getDoc(docRef);
  let data;
  data = docSnap.data();
  expect(data?.uid).toBe("testFadel");
});



