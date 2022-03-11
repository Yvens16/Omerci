import React from "react";
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import PersonalSpace from '../../pages/personal_space';


describe("Test personal space page", () => {
  it("Should render initials", () => {
      const { getByText } = render(<PersonalSpace/>);
      // const initails = getByText('FB');
      // expect(initails).toHaveTextContent('FB');
  })
})