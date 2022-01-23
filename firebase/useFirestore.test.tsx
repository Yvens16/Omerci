// import React from 'react';
// import useFirestore from './useFirestore';
// import { renderHook, act } from '@testing-library/react-hooks';
// import * as firestore from 'firebase/firestore';
// import * as firebase from 'firebase/app';
// // import { initializeApp } from "firebase/app";
// // import { getDoc, getFirestore, doc } from 'firebase/firestore';


// // firebase.getDoc = jest.fn();
// // jest.spyOn(firebase, 'getDoc');
// // firebase.getDoc.mockImplementation(() => {
// //   return {
// //     email: 'yvens@gmail.com'
// //   }
// // })
// jest.spyOn(firestore, 'getDoc');
// // const foo = { getDoc };
// // jest.spyOn(firestore, 'getDoc').mockImplementation((({name: "Yvens"}) as unknown) as any);
// // const mockFirestore = firebase as jest.Mocked<typeof firebase>;

// describe('Test on useFirestore hook', () => {
//   it('should see the test', async () => {
//     jest.mock('firebase/firestore', () => {
//       return {
//         getDoc: jest.fn(() => {return {name : "yvens"}}),
//         getFirestore: jest.fn(),
//         doc: jest.fn()
//       }
//     });
    
//     jest.mock('firebase/app', () => {
//       return {
//         initializeApp: jest.fn(),
//         apps: jest.fn()
//       }
//     })
//     const expectedConfig = {
//       apiKey: 'key',
//       authDomain: 'domain',
//       databaseURL: 'database',
//       projectId: 'project',
//       storageBucket: 'bucket',
//       messagingSenderId: 'sender'
//     };
//       firebase.initializeApp(expectedConfig, "test fireabse");
//     /**
//      * We don't need to test that the call send back the desired data
//      * This is the job of the autho's library
//      * We just need to test our own logic
//      */


//     /**
//      * Firestore c'est une librarie
//      */


//     const {result,waitForNextUpdate} = renderHook(() =>  useFirestore());
//     await waitForNextUpdate();
//     act(() => {
//       result.current.getUserInfo("uid1");
//     });
//     // console.log(firestore.getDoc);
//     // const db = firestore.getFirestore();
//     // const docRef = firestore.doc(db, "users", "dhsjdhkjshdfkbfk");
//     expect(firestore.getDoc).toHaveBeenCalled();
//   })
// });