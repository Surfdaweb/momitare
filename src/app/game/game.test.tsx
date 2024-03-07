import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import React from 'react';

import Game from './game';

describe('Game', () => {
  it('renders itself without errors', () => {
    render(<Game />);
  });

  describe('when the game starts', () => {
    it('renders all empty foundation piles', () => {
      render(<Game />);
      const foundationSection = screen.getByTestId('foundations');
      const foundations = within(foundationSection).getAllByRole('button');

      expect(foundations.length).toEqual(8);
      foundations.forEach((foundation) => {
        expect(foundation).toBeVisible();
        expect(within(foundation).getByText('A')).toBeVisible();
      });
    });

    it('renders all empty tableau piles', () => {
      render(<Game />);
      const tableauSection = screen.getByTestId('tableau');
      const tableauPiles = within(tableauSection).getAllByRole('button');

      expect(tableauPiles.length).toEqual(14);
      tableauPiles.forEach((pile) => {
        expect(pile).toBeVisible();
      });
    });

    it('renders the dealer deck where the hand will be', () => {
      render(<Game />);
      const hand = screen.getByTestId('hand');
      const pile = within(hand).getByRole('button');

      expect(pile).toBeVisible();
    });
  });
});
