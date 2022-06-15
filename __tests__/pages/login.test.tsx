import { cleanDB, signOutTestUser } from '../../testUtils';
import React from "react";
import { screen, waitFor } from '@testing-library/react';
import { customRender } from "../../test-utils";

import LoginPage from '../../pages/login';
import userEvent from "@testing-library/user-event";
import 'isomorphic-fetch';
import { LocalStorageMock } from '@react-mock/localstorage';
jest.mock('next/router', () => ({
  useRouter() {
    return ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    });
  },
}));
jest.mock("../../firebase/useFirestore.tsx", () => jest.fn(() => {
  return {
    addUserInfo: jest.fn(),
    getUserInfo: jest.fn().mockImplementation(() => {
      return {
        firstName: "Fake",
        lastName: "user",
        email: "fake_user@gmail.com"
      }
    })
  }
}));


afterEach(async () => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      href: 'http://localhost:3000/login'
    }
  });
  await cleanDB();
})

const getEmailLink = async () => {
  try {
    const res = await fetch("http://localhost:9099/emulator/v1/projects/demo-omerci/oobCodes");
    const responseObj = await res.json();
    const codes = responseObj.oobCodes;
    const obj = codes[codes.length - 1];
    let urlLink = `http://localhost:3000/login?email=${obj.email}&mode=signIn&lang=en&oobCode=${obj.oobCode}&apiKey=fake-api-key`;
    return urlLink;
  } catch (err) {
    console.log("ERRROR OOOBLINK", err)
  }
}

const rightEmail = 'fake_user@gmail.com';

const SendEmailLink = async () => {
  customRender(<LoginPage />);
  // const emailInput = await waitFor(() => screen.getByPlaceholderText("jean.dujardin@gmail.com"));
  const emailInput = await screen.findByPlaceholderText("jean.dujardin@gmail.com");
  const user = userEvent.setup();
  const firstNextButton = screen.getAllByText('Suivant')[0];


  await user.type(emailInput, 'fake_usegmail.com');
  await user.click(firstNextButton);

  const errorMsg = await screen.findByText("L'adresse email n'est pas valide, veuillez réessayer svp");
  expect(errorMsg).toBeInTheDocument();
  await user.clear(emailInput);

  await user.type(emailInput, rightEmail);
  await user.click(firstNextButton);
}



const setUrl = async (isDifferentDevice=false) => {
  const url = await getEmailLink();
  console.log('url:', url)
  const search = url!.split('login')[1];
  if (!isDifferentDevice) {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href: url,
        search: search,
      }
    });
  } else {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href: url,
        search: null,
      }
    });
  }
}

test("Should login existing user on same device", async () => {
  await signOutTestUser();
  await SendEmailLink();
  await setUrl();
  customRender(<LoginPage />);
  await waitFor(() => {
    expect(screen.getByText("🎉 Content de vous revoir, Fake !")).toBeInTheDocument();
  })
  expect(screen.getByText("fake_user@gmail.com")).toBeInTheDocument();
  expect(screen.getByText("Fake user")).toBeInTheDocument();
})

test("Should login new user on same device", async () => {
  await SendEmailLink();
  await waitFor(() => {
    expect(screen.getByText("Vous n'avez pas reçu d'email ?")).toBeInTheDocument();
  })
  await setUrl();
  customRender(<LoginPage />);
  await waitFor(() => {
    expect(screen.getByText("Bienvenue !")).toBeInTheDocument();
  })
});



test("Should login new user on different device from where the email was entered", async () => {
  const user = userEvent.setup();
  await SendEmailLink();
  await setUrl(true);
  customRender(
    <LocalStorageMock items={{ emailForSignIn: null }}>
      <LoginPage />
    </LocalStorageMock>
  );
  const modal = await screen.findByText("Oups, il semblerait que vous ayez changé d'appareil !");
  await waitFor(() => expect(modal).toBeInTheDocument());
  const input = screen.getByPlaceholderText("ici-votre@email.com 2222");

  const nextBtn = screen.getAllByRole("button", { name: "Suivant" })[1];
  await user.type(input, 'fake_user@gmail.com');
  await user.click(nextBtn);
  // await waitFor(() => expect(screen.getByText("Bienvenue !")).toBeInTheDocument())
  expect(await screen.findByText("Bienvenue !")).toBeInTheDocument()
})

test("Should login existing user on different device from where the email was entered", async () => {
  await signOutTestUser();
  const user = userEvent.setup();
  await SendEmailLink();
  await setUrl(true);
  customRender(
    <LocalStorageMock items={{ emailForSignIn: null }}>
      <LoginPage />
    </LocalStorageMock>
  );
  const modal = await screen.findByText("Oups, il semblerait que vous ayez changé d'appareil !");
  await waitFor(() => expect(modal).toBeInTheDocument());
  const input = screen.getByPlaceholderText("ici-votre@email.com 2222");

  const nextBtn = screen.getAllByRole("button", { name: "Suivant" })[1];
  await user.type(input, 'fake_user@gmail.com');
  await user.click(nextBtn);
  await waitFor(() => {
    expect(screen.getByText("🎉 Content de vous revoir, Fake !")).toBeInTheDocument();
  })
  expect(screen.getByText("fake_user@gmail.com")).toBeInTheDocument();
  expect(screen.getByText("Fake user")).toBeInTheDocument();
})


//TODO: BEST WAY TO MANAGE LOTS OF STATES IN COMPONENTS
//TODO: LA&ZY LOADING COMPONENTS IN REACT
//http://localhost:9099/emulator/v1/projects/omerci/oobCodes

//https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAh3ShDMt8oc23G6U8yYTwl3qJNbdauX4w
// http://localhost:9099/emulator/v1/projects/demo-omerci/oobCodes