import { render } from "@testing-library/react";
import React from "react";
import Header from './Header';


describe("Test Header", () => {
  it("Check initials and Greeting", () => {
    const { getByText } = render(<Header firstName="Yvens" lastName="Belaston"/>)
    const initails = getByText('YB');
    expect(initails).toHaveTextContent('YB');
    const greeting = getByText("Bonjour, Yvens");
    expect(greeting).toHaveTextContent("Bonjour, Yvens");
  })
})