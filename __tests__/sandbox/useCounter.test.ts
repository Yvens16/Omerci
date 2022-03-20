import { useCounter } from './useCounter';
import useFirebaseAuth from '../../firebase/useFirebaseAuth';
import { renderHook, act } from '@testing-library/react-hooks';
import 'isomorphic-fetch';
import { waitFor } from '@testing-library/dom';


// test('Sandbox reactHook', () => {
//   const {result} = renderHook(() => useCounter());
//   act(() => {
//     result.current.increment();
//   });
// });

// test('Firebase Auth', () => {
//   const {result} = renderHook(() => useFirebaseAuth());
//   act(() => {
//     result.current.magicSignInUp("faekuser@gmail.com");
//   })
// });

// // import isomorphic-fetch to be able to use fetch anywhere node and browser like environnement 
test('Firebase Auth', async() => {
  const {result} = renderHook(() => useCounter());
  await waitFor(async() => {
    const data = await result.current.fetchData();
  })
});



