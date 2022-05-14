import useFirebaseAuth from '../../firebase/useFirebaseAuth';



export function Fake_User() {
  return jest.mock("../../firebase/useFirebaseAuth.tsx", () => jest.fn(() => {
    return {
      authUser: {
        uid: "fefe46fe4f6e4f",
        displayName: "Fadel Test",
        email: "fake_user@gmail.com",
        photoUrl: "",
        isAnonymous: false,
        emailVerified: false,
      },
      doesEmailAlreadyExist: jest.fn(),
      magicSignInUp: jest.fn()
    }
  }));
}

export function Fake_User_Null() {
  return (useFirebaseAuth as jest.Mock).mockImplementationOnce(() => {
    return {
      authUser: null,
      doesEmailAlreadyExist: jest.fn().mockResolvedValueOnce(true),
      anonymousSignIn: jest.fn(),
      magicSignInUp: jest.fn()
    }
  })
}