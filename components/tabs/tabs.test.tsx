import React from 'react'
import Tabs from './Tabs';
import { screen, waitFor } from '@testing-library/react';
import { customRender } from "../../test-utils";
import userEvent from '@testing-library/user-event';
// import from test-utils when you neet your test to take into account the login behavior of a user

test('tabs ui', () => {
  const tabs = ['Hello1', 'Hello2', 'Hello3'];
  const mockWhichIndex = jest.fn();
  customRender(<Tabs tabs={tabs} whichIndex={mockWhichIndex} />);
  expect(screen.getByText('Hello1')).toBeInTheDocument();

  userEvent.click(screen.getByText('Hello1'));
})