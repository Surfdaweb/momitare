import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import React from 'react';

import { Suit } from '../cardContent/cardContent';
import Game, { GameProps } from './game';

const defaultProps: GameProps = {
  foundations: [[], [], [], [], [], [], [], []],
  tableau: [[], [], [], [], [], [], [], [], [], [], [], [], [], []]
};

describe('Game', () => {
  it('renders itself without errors', () => {
    render(<Game {...defaultProps} />);
  });

  describe('when the game starts', () => {
    it('renders all empty foundation piles', () => {
      render(<Game {...defaultProps} />);
      const foundationSection = screen.getByTestId('foundations');
      const foundations = within(foundationSection).getAllByRole('button');

      expect(foundations.length).toEqual(8);
      foundations.forEach((foundation, index) => {
        expect(foundation).toBeVisible();
        let expectedLabel = 'K';
        if (index < 4) {
          expectedLabel = 'A';
        }
        expect(within(foundation).getByText(expectedLabel)).toBeVisible();
      });
    });

    it('renders the dealt out tableau piles', () => {
      const myProps = {
        ...defaultProps,
        tableau: [
          [{ value: 2, suit: Suit.Spades }],
          [{ value: 3, suit: Suit.Spades }],
          [{ value: 4, suit: Suit.Spades }],
          [{ value: 5, suit: Suit.Spades }],
          [{ value: 6, suit: Suit.Diamonds }],
          [{ value: 7, suit: Suit.Diamonds }],
          [{ value: 8, suit: Suit.Diamonds }],
          [{ value: 9, suit: Suit.Diamonds }],
          [{ value: 10, suit: Suit.Clubs }],
          [{ value: 2, suit: Suit.Clubs }],
          [{ value: 3, suit: Suit.Clubs }],
          [{ value: 4, suit: Suit.Clubs }],
          [{ value: 5, suit: Suit.Hearts }],
          [{ value: 6, suit: Suit.Hearts }]
        ]
      };
      render(<Game {...myProps} />);
      const tableauSection = screen.getByTestId('tableau');
      const tableauPiles = within(tableauSection).getAllByRole('button');

      expect(tableauPiles.length).toEqual(14);
      tableauPiles.forEach((pile, index) => {
        expect(pile).toBeVisible();
        const expectedValue = index < 9 ? index + 2 : index - 7;
        let expectedSuit = 'of Hearts';
        if (index < 4) {
          expectedSuit = 'of Spades';
        } else if (index < 8) {
          expectedSuit = 'of Diamonds';
        } else if (index < 12) {
          expectedSuit = 'of Clubs';
        }
        expect(within(pile).getByText(`${expectedValue}`)).toBeVisible();
        expect(within(pile).getByAltText(expectedSuit)).toBeVisible();
      });
    });
  });

  describe('when there are no cards in the tableau', () => {
    it('renders all empty tableau piles', () => {
      render(<Game {...defaultProps} />);
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
  });
});
