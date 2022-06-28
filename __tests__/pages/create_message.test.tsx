import React from "react";
import { screen, waitFor } from '@testing-library/react';
import { customRender } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import useFirebaseAuth from '../../firebase/useFirebaseAuth';
import Router from 'next/router';
import useFirestore from "../../firebase/useFirestore";
import CreateMessage from "@pages/create_message";


/** 
 * 1) Add message, gif, unsplash, custom pic without cagnotte 
*/


test("User is creating a message", async() => {

  // Add an element to jest dom that is empty by default
  const root = document.createElement('div');
  root.id="myportal"
  document.body.appendChild(root);

  customRender(<CreateMessage/>)
  const user = userEvent.setup();
  const textArea = await screen.findByPlaceholderText("Tapez votre message...");
  const surnameInput = screen.getByPlaceholderText("Jean");
  const nameInput = screen.getByPlaceholderText("Dujardin");
  const emailInput = screen.getByPlaceholderText("jeandujardin@gmail.com");
  await user.type(textArea, "Bon départ Brad !")
  await user.type(surnameInput, "Itachi")
  await user.type(nameInput, "Uchiha")
  await user.type(emailInput, "itachiu@gmail.com")
  expect(textArea).toHaveValue("Bon départ Brad !")
  expect(surnameInput).toHaveValue("Itachi")
  expect(nameInput).toHaveValue("Uchiha")
  expect(emailInput).toHaveValue("itachiu@gmail.com")

  const gifMediaButton  = screen.getByText("GIF");
  await user.click(gifMediaButton);
  const gifTitle = screen.getByText("Rechercher un GIF")
  expect(gifTitle).toBeInTheDocument();
  await user.click(screen.getByTestId("gifySearch"));
  expect(gifTitle).not.toBeInTheDocument();
});