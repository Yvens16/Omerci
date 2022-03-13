import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Page from '../../pages/create_new_card';


test('Create a new card page', () => {
  const { getByText, getByPlaceholderText } = render(<Page/>)
  const cancelButton = getByText("Annuler");
  const createCardButton = getByText("Créer la carte");

  const recipientName = getByPlaceholderText('Jean Dupont');
  const cardTitle = getByPlaceholderText('Merci pour tout Thomas !');
  const teamName = getByPlaceholderText("Toute l'équipe compta !");

  expect(cancelButton).not.toBeDisabled();
  expect(createCardButton).toBeDisabled();
  
  userEvent.type(recipientName, 'Fadel Gueye');
  userEvent.type(cardTitle, "Ce n'est qu'un au revoir !");
  userEvent.type(teamName, "L'équipe dev");

  expect(cancelButton).not.toBeDisabled();
  expect(createCardButton).toBeDisabled();

  userEvent.click(cancelButton);
  expect(recipientName).toHaveAttribute('value', '');

})
