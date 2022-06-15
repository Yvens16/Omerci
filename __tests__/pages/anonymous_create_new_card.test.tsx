import React from "react";
import { screen, waitFor } from '@testing-library/react';
import { customRender } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import useFirebaseAuth from '../../firebase/useFirebaseAuth';
import Router from 'next/router';
import useFirestore from "../../firebase/useFirestore";

import CreateNewCardPage from '../../pages/create_new_card';

const fakeUserName = "Fake user";
const fakeUserEmail = "fake_user@gmail.com";

// jest.mock("../../firebase/useFirestore.tsx");
  const mockCreateNewCard = jest.fn().mockResolvedValueOnce("fake_uid");
jest.mock("../../firebase/useFirestore.tsx", () => jest.fn(() => {
  return {
    createNewCard: mockCreateNewCard,
    addUserInfo: jest.fn()
  }
}))

jest.mock('next/router', () => ({ push: jest.fn() }))

const setUrl = async (url: string) => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      href: url,
    }
  });
}

jest.mock("../../firebase/useFirebaseAuth.tsx", () => jest.fn(() => {
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


beforeEach(() => {
  jest.clearAllMocks();
})


test("User is Anonymous and create a card", async () => {
  const user = userEvent.setup();
  //todo: User is not authenticated
  //todo: Same test with user authenticated
  (useFirebaseAuth as jest.Mock).mockImplementationOnce(() => {
    return {
      authUser: null,
      doesEmailAlreadyExist: jest.fn().mockResolvedValueOnce(false),
      anonymousSignIn: jest.fn().mockResolvedValueOnce({uid: "fake_anonymous_uid"}),
      magicSignInUp: jest.fn()
    }
  })

  customRender(<CreateNewCardPage />);
  await waitFor(() => {
    expect(screen.getByText("Nous vous enverrons un lien pratique pour gérer votre espace.")).toBeInTheDocument();
  })
  const recipientName = screen.getByPlaceholderText("Jean Dupont");
  const titleSpace = screen.getByPlaceholderText("Merci pour tout Thomas !");
  const teamName = screen.getByPlaceholderText("Toute l'équipe compta !");
  const nameInput = screen.getByPlaceholderText("John Doe");
  const emailInput = screen.getByPlaceholderText("johndoe@gmail.com");
  const createBtn = screen.getByText("Créer la carte");
  await user.type(recipientName, "Recipient Test")
  await user.type(titleSpace, "Merci pour tout Fake User")
  await user.type(nameInput, fakeUserName);
  await user.type(emailInput, fakeUserEmail);
  await user.type(teamName, "Toute l'équipe Compta");
  await user.click(createBtn);
  //todo: delete the not in the test once I trully want to redirect 
  await waitFor(() => {
    expect(Router.push).not.toHaveBeenCalledWith("/card/fake_uid");
  })
  expect(mockCreateNewCard).toHaveBeenCalledWith({"hasCagnotte": false, "isPremium": false, "recipientName": "Recipient Test", "teamName": "Toute l'équipe Compta", "title": "Merci pour tout Fake User", "userId": "fake_anonymous_uid"});
})

test("User is Anonymous but has an account", async () => {
  const user = userEvent.setup();

  (useFirebaseAuth as jest.Mock).mockImplementationOnce(() => {
    return {
      authUser: null,
      doesEmailAlreadyExist: jest.fn().mockResolvedValueOnce(true),
      anonymousSignIn: jest.fn(),
      magicSignInUp: jest.fn()
    }
  })
  customRender(<CreateNewCardPage />);
  const recipientName = screen.getByPlaceholderText("Jean Dupont");
  const titleSpace = screen.getByPlaceholderText("Merci pour tout Thomas !");
  const teamName = screen.getByPlaceholderText("Toute l'équipe compta !");
  const nameInput = screen.getByPlaceholderText("John Doe");
  const emailInput = screen.getByPlaceholderText("johndoe@gmail.com");
  const createBtn = screen.getByText("Créer la carte");
  await user.type(recipientName, "Recipient Test")
  await user.type(titleSpace, "Merci pour tout Fake User")
  await user.type(nameInput, fakeUserName);
  await user.type(emailInput, fakeUserEmail);
  await user.type(teamName, "Toute l'équipe Compta");
  await user.click(createBtn);
  expect(screen.getByText("Souhaitez-vous vous connecter ?")).toBeInTheDocument();
  // const cancelBtn = screen.getAllByText("Annuler")[1];
  const connectionBtn = screen.getByText("Me connecter");
  await user.click(connectionBtn);
  await waitFor(() => {
    expect(screen.getByText("Vous n’avez pas reçu d’email ?")).toBeInTheDocument();
  })
  const closeEmailSentModalBtn = screen.getByText("Retour");
  await user.click(closeEmailSentModalBtn);
  expect(screen.queryByText("Retour")).not.toBeInTheDocument();
  // expect(screen.getByText("un compte Omerci")).toBeInTheDocument();
  const modalLink = screen.getByText("un compte Omerci");
  await user.click(modalLink);
  expect(screen.getByText("Souhaitez-vous vous connecter ?")).toBeInTheDocument();
})


/**
 * The parenthesis after the arrow and before the curly braces
 */
// (useFirebaseAuth as jest.Mock).mockImplementationOnce(() => ({
//   authUser:{
//     uid: "fefe46fe4f6e4f",
//     email: "fake_user@gmail.com",
//     isAnonymous: true,
//   }
// }))

test("User is not anonymous and Create a card", async () => {
  (useFirebaseAuth as jest.Mock).mockImplementationOnce(() => {
    return {
      authUser: { isAnonymous: false }
    }
  })
  customRender(<CreateNewCardPage />);
  expect(screen.queryByText("Nous vous enverrons un lien pratique pour gérer votre espace.")).not.toBeInTheDocument();
})

// test("User connected and get back to the card he was completing witth all infos", async() => {
//   const url = `${window.location.origin}?name=Fadel&title=Merci%20Fadel&team=L'équipe%20compta&isPremium=true&hasCagnotte=false`;
//   setUrl(url);
//   customRender(<CreateNewCardPage/>);
//   await waitFor(() => {
//     expect(screen.getByPlaceholderText("Jean Dupont")).toHaveValue("Fadel");
//   })
//   expect(screen.getByRole("checkbox", {name : "Passer premium !"})).toBeChecked();
//   expect(screen.getByRole("checkbox", {name : "Ajouter une cagnotte en ligne"})).not.toBeChecked();
//   expect(screen.getByPlaceholderText("Merci pour tout Thomas !")).toHaveValue("Merci Fadel");
//   expect(screen.getByPlaceholderText("Toute l'équipe compta !")).toHaveValue("L'équipe compta");
// })