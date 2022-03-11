import React from 'react';
import { waitFor, cleanup, prettyDOM } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { customRender } from "../../test-utils";
import Login from '../../pages/login';
import userEvent from "@testing-library/user-event";
import {useCounter} from './useCounter';





function Dom() {
  const {increment, count, incrementAsync} =  useCounter();
  const handleClick = () => {
    console.log('@@@@@@@@@@@@@@@@@@biutton')
    incrementAsync()
  }
  return<>
  <span data-testid="count">{count}</span>
  <button onClick={() => handleClick()}>click</button>
  </>;
}
afterEach(() => cleanup());
test("LOGIN FLOW: first screen", async () => {
  // const { getByText, getByTestId } = render(<Dom/>);
  // const user = userEvent.setup();
  // const btn = getByText("click");
  // console.log('btn:', prettyDOM(btn))
  // await user.click(btn);
  // await user.click(btn);
  // #### await waitFor for async hook call ####
  // await waitFor(() => {
  //   expect(getByTestId("count")).toHaveTextContent("2");
  //   console.log(prettyDOM(getByTestId("count")));
  // })



  //#### customRender to be able to use the context ####
  // const { getByPlaceholderText,  getAllByText, queryByText, findByText,findByPlaceholderText } = customRender(<Login/>);
  // const emailInput = await waitFor(() => getByPlaceholderText("jean.dujardin@gmail.com"));
  // const emailInput = await findByPlaceholderText("jean.dujardin@gmail.com");
  // const firstNextButton = getAllByText('Suivant')[0];


  // await user.type(emailInput, 'fake_user@gmail.com');
  // // console.log('btn:', prettyDOM(EmailSent))
  // await user.click(firstNextButton);
  // await waitFor(async() => {
  //   const EmailSent = await findByText("Vous n'avez pas reçu d'email ?");
  //   expect(EmailSent).toBeInTheDocument();
  // })
});