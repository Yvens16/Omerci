import { cleanDB, createTestUser } from './../testUtils';
import React from "react";
import { screen, waitFor, cleanup, prettyDOM } from '@testing-library/react';
import { customRender } from "../../test-utils";

import LoginPage from '../../pages/login';
import userEvent from "@testing-library/user-event";
import 'isomorphic-fetch';
import { LocalStorageMock } from '@react-mock/localstorage';

afterAll(async() => {
  await cleanDB();
})
const getEmailLink = async() => {
  try {
    const res = await fetch("http://localhost:9099/emulator/v1/projects/demo-omerci/oobCodes");
    const responseObj = await res.json();
    const codes = responseObj.oobCodes;
    return codes[codes.length - 1].oobLink.replace("9099", "3000");
  } catch(err) {
    console.log("ERRROR OOOBLINK", err)
  }
}

const rightEmail = 'fake_user@gmail.com';
const signedUserEmail = 'fake_signed_user@gmail.com';
const signedPassword = 'pass';


const setUrl = async() => {
  const url = await getEmailLink();
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      href: url
    }
  });
}

test("LOGIN FLOW: first screen", async () => {
  customRender(<LoginPage />);
  const emailInput = await waitFor(() => screen.getByPlaceholderText("jean.dujardin@gmail.com"));
  const user = userEvent.setup();
  const firstNextButton = screen.getAllByText('Suivant')[0];


  await user.type(emailInput, 'fake_usegmail.com');
  await user.click(firstNextButton);

  const errorMsg = await screen.findByText("L'adresse email n'est pas valide, veuillez réessayer svp");
  expect(errorMsg).toBeInTheDocument();
  await user.clear(emailInput);

  await user.type(emailInput, rightEmail);
  await user.click(firstNextButton);

  await waitFor(async() => {
    const EmailSent = await screen.findByText("Vous n'avez pas reçu d'email ?");
    expect(EmailSent).toBeInTheDocument();
  })
});

// describe("Test alien device", () => {
//   beforeEach(() => {

//   })
// })

describe('Login Flow different device', () => {
  test('NEW USER', async() => {
    const user = userEvent.setup();
    await setUrl();
    customRender(
      <LocalStorageMock items={{ emailForSignIn: null }}>
        <LoginPage/>
        </LocalStorageMock>
    );
    const modal = await screen.findByText("Oups, il semblerait que vous ayez changé d'appareil !");
    await waitFor(() => expect(modal).toBeInTheDocument());
    const input = screen.getByPlaceholderText("ici-votre@email.com 2222");
  
    const nextBtn = screen.getAllByRole("button", {name:"Suivant"})[1];
    await user.type(input, 'fake_user@gmail.com');
    await user.click(nextBtn);
    const newUserSection = await screen.findByText("Bienvenue !");//🎉 Content de vous revoir,
    await waitFor(() => expect(newUserSection).toBeInTheDocument())
  })
  test('KNOWN USER', async() => {
    const { email, password } = await createTestUser();
    const user = userEvent.setup();
    await setUrl();
    customRender(
      <LocalStorageMock items={{ emailForSignIn: null }}>
        <LoginPage/>
        </LocalStorageMock>
    );
    const modal = await screen.findByText("Oups, il semblerait que vous ayez changé d'appareil !");
    await waitFor(() => expect(modal).toBeInTheDocument());
    const input = screen.getByPlaceholderText("ici-votre@email.com 2222");
  
    const nextBtn = screen.getAllByRole("button", {name:"Suivant"})[1];
    await user.type(input, email);
    await user.click(nextBtn);
    const knwonUserSection = await screen.findByText("🎉 Content de vous revoir, !");
    await waitFor(() => expect(knwonUserSection).toBeInTheDocument())
  })

})

// test("LOGIN FLOW: Signup screen", async () => {
//   await setUrl();
//   customRender(<LoginPage />);
//   const input = await waitFor(() => screen.findByText("Votre nom"));
//   console.log(screen.debug(input))
// });

//TODO: BEST WAY TO MANAGE LOTS OF STATES IN COMPONENTS
//TODO: LA&ZY LOADING COMPONENTS IN REACT
//http://localhost:9099/emulator/v1/projects/omerci/oobCodes

//https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAh3ShDMt8oc23G6U8yYTwl3qJNbdauX4w
// http://localhost:9099/emulator/v1/projects/demo-omerci/oobCodes