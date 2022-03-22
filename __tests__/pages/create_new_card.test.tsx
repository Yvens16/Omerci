import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Page from '../../pages/create_new_card';


test('Create a new card page', () => {
  render(<Page/>)
  const cancelButton = screen.getAllByText("Annuler")[0];
  const createCardButton = screen.getByText("Créer la carte");

  const recipientName = screen.getByPlaceholderText('Jean Dupont');
  const cardTitle = screen.getByPlaceholderText('Merci pour tout Thomas !');
  const teamName = screen.getByPlaceholderText("Toute l'équipe compta !");

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
