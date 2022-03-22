import React from 'react'
import Tabs from './Tabs';
import { render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import from test-utils when you neet your test to take into account the login behavior of a user

test('tabs ui', () => {
  const tabs = ['Hello1', 'Hello2', 'Hello3'];
  const mockWhichIndex = jest.fn();
  const {getByText} = render(<Tabs tabs={tabs} whichIndex={mockWhichIndex} />);
  expect(getByText('Hello1')).toBeInTheDocument();

  userEvent.click(getByText('Hello1'));
})