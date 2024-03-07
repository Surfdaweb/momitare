import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import React from 'react';

import Game from './game';

describe('Game', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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
      tableauPiles.forEach((pile, index) => {
        expect(pile).toBeVisible();
        switch (index) {
          case 0:
            expect(within(pile).getByText('A')).toBeVisible();
            break;
          case 10:
            expect(within(pile).getByText('S')).toBeVisible();
            break;
          case 11:
            expect(within(pile).getByText('J')).toBeVisible();
            break;
          case 12:
            expect(within(pile).getByText('Q')).toBeVisible();
            break;
          case 13:
            expect(within(pile).getByText('K')).toBeVisible();
            break;
          default:
            expect(within(pile).getByText(index + 1)).toBeVisible();
            break;
        }
      });
    });

    it('renders the dealer deck where the hand will be', () => {
      render(<Game />);
      const hand = screen.getByTestId('hand');
      const pile = within(hand).getByRole('button');

      expect(pile).toBeVisible();
      expect(within(pile).queryByText('D')).not.toBeInTheDocument();
    });
  });
});
