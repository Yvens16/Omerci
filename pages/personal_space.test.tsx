import React from "react";
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import PersonalSpace from './personal_space';


describe("Test personal space page", () => {
  it("Should render initials", () => {
      const { getByText } = render(<PersonalSpace/>);
      const initails = getByText('YB');
      expect(initails).toHaveTextContent('YB');
  })
})