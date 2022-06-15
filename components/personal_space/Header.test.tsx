import { screen, waitFor } from '@testing-library/react';
import { customRender } from "../../test-utils";
import React from "react";
import Header from './Header';


describe("Test Header", () => {
  it("Check initials and Greeting", () => {
    customRender(<Header firstName="Yvens" lastName="Belaston"/>)
    const initails = screen.getByText('YB');
    expect(initails).toHaveTextContent('YB');
    const greeting = screen.getByText("Bonjour, Yvens");
    expect(greeting).toHaveTextContent("Bonjour, Yvens");
  })
})