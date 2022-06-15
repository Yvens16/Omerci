import Navbar from "./Navbar";
import { customRender } from "../../test-utils";
import { screen, waitFor } from "@testing-library/react";
jest.mock("../../firebase/useFirebaseAuth.tsx");
import useFirebaseAuth from '../../firebase/useFirebaseAuth';

const userConnected = {
  uid: "1234",
  firstName: "User",
  lastName: "Test",
  email: "usertest@gmail.com",
  photoUrl: "photoUrl",
  isAnonymous: false,
  emailVerified: true,
}

const userNotConnected = null;



test('Show profil icon when connected ', async () => {
  const mockedUserFirebaseAuth = (useFirebaseAuth as jest.Mock).mockImplementation(() => {
    return {
      authUser: userConnected,
    }
  })
  customRender(<Navbar/>);
  const connexionBtn = screen.queryByText("Connexion");
  expect(connexionBtn).not.toBeInTheDocument();
})

test('Show profil connexion Button when not connected ', async () => {
  const mockedUserFirebaseAuth = (useFirebaseAuth as jest.Mock).mockImplementation(() => {
    return {
      authUser: userNotConnected,
    }
  })
  customRender(<Navbar/>);
  const connexionBtn = screen.queryByText("Connexion");
  expect(connexionBtn).toBeInTheDocument();
})