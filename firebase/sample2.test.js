
import firebase, { getApps } from "firebase/app";
jest.mock('firebase/app', () => {
  return {
    initializeAuth: jest.fn(() => "User"),
    getApps: jest.fn(() => ["app1", "app2"])
  }
})
test('sample test', () => {
  // const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
  // expect(winner).toBe('Kent C. Dodds')
  // expect(getWinner.mock.calls).toEqual([
  //   ['Kent C. Dodds', 'Ken Wheeler'],
  //   ['Kent C. Dodds', 'Ken Wheeler']
  // ])

  // cleanup
})