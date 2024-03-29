import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Card, Suit } from '../cardContent/cardContent';
import { BuildDeckService } from '../services/buildDeck/buildDeck.service';
import GameLogic from './gameLogic';

describe('GameLogic', () => {
  beforeEach(() => {
    const expectedDeck: Card[] = [
      { value: 1, suit: Suit.Hearts }, // S
      { value: 1, suit: Suit.Spades }, // Q
      { value: 1, suit: Suit.Spades }, // S
      { value: 1, suit: Suit.Diamonds }, // J
      { value: 1, suit: Suit.Diamonds }, // S
      { value: 1, suit: Suit.Clubs }, // S
      { value: 1, suit: Suit.Clubs }, // 10

      { value: 2, suit: Suit.Hearts }, // 9
      { value: 2, suit: Suit.Hearts }, // 8
      { value: 2, suit: Suit.Spades }, // S
      { value: 2, suit: Suit.Spades }, // 7
      { value: 2, suit: Suit.Diamonds }, // 6
      { value: 2, suit: Suit.Diamonds }, // 5
      { value: 2, suit: Suit.Clubs }, // 4
      { value: 2, suit: Suit.Clubs }, // 3

      { value: 3, suit: Suit.Hearts }, // 2
      { value: 3, suit: Suit.Hearts }, // A
      { value: 3, suit: Suit.Spades }, // S
      { value: 3, suit: Suit.Spades }, // K
      { value: 3, suit: Suit.Diamonds }, // Q
      { value: 3, suit: Suit.Diamonds }, // J
      { value: 3, suit: Suit.Clubs }, // S
      { value: 3, suit: Suit.Clubs }, // 10

      { value: 4, suit: Suit.Hearts }, // 9
      { value: 4, suit: Suit.Hearts }, // 8
      { value: 4, suit: Suit.Spades }, // S
      { value: 4, suit: Suit.Spades }, // 7
      { value: 4, suit: Suit.Diamonds }, // 6
      { value: 4, suit: Suit.Diamonds }, // 5
      { value: 4, suit: Suit.Clubs }, // S
      { value: 4, suit: Suit.Clubs }, // 4

      { value: 5, suit: Suit.Hearts }, // 3
      { value: 5, suit: Suit.Hearts }, // 2
      { value: 5, suit: Suit.Spades }, // A
      { value: 5, suit: Suit.Spades }, // S
      { value: 5, suit: Suit.Diamonds }, // K
      { value: 5, suit: Suit.Diamonds }, // Q
      { value: 5, suit: Suit.Clubs }, // J
      { value: 5, suit: Suit.Clubs }, // S

      { value: 6, suit: Suit.Hearts }, // 10
      { value: 6, suit: Suit.Hearts }, // 9
      { value: 6, suit: Suit.Spades }, // 8
      { value: 6, suit: Suit.Spades }, // S
      { value: 6, suit: Suit.Diamonds }, // 7
      { value: 6, suit: Suit.Diamonds }, // S
      { value: 6, suit: Suit.Clubs }, // 6
      { value: 6, suit: Suit.Clubs }, // 5

      { value: 7, suit: Suit.Hearts }, // 4
      { value: 7, suit: Suit.Hearts }, // 3
      { value: 7, suit: Suit.Spades }, // 2
      { value: 7, suit: Suit.Spades }, // A
      { value: 7, suit: Suit.Diamonds }, // S
      { value: 7, suit: Suit.Diamonds }, //K
      { value: 7, suit: Suit.Clubs }, // Q
      { value: 7, suit: Suit.Clubs }, // J

      { value: 8, suit: Suit.Hearts }, // S
      { value: 8, suit: Suit.Hearts }, // 10
      { value: 8, suit: Suit.Spades }, // 9
      { value: 8, suit: Suit.Spades }, // S
      { value: 8, suit: Suit.Diamonds }, // 8
      { value: 8, suit: Suit.Diamonds }, // S
      { value: 8, suit: Suit.Clubs }, // 7
      { value: 8, suit: Suit.Clubs }, // 6

      { value: 9, suit: Suit.Hearts }, // 5
      { value: 9, suit: Suit.Hearts }, // 4
      { value: 9, suit: Suit.Spades }, // 3
      { value: 9, suit: Suit.Spades }, // 2
      { value: 9, suit: Suit.Diamonds }, // A
      { value: 9, suit: Suit.Diamonds }, // S
      { value: 9, suit: Suit.Clubs }, // K
      { value: 9, suit: Suit.Clubs }, // Q

      { value: 10, suit: Suit.Hearts }, // J
      { value: 10, suit: Suit.Hearts }, // S
      { value: 10, suit: Suit.Spades }, // S
      { value: 10, suit: Suit.Spades }, // 10
      { value: 10, suit: Suit.Diamonds }, // 9
      { value: 10, suit: Suit.Diamonds }, // 8
      { value: 10, suit: Suit.Clubs }, // S
      { value: 10, suit: Suit.Clubs }, // 7

      { value: 11, suit: Suit.Hearts }, // 6
      { value: 11, suit: Suit.Hearts }, // 5
      { value: 11, suit: Suit.Spades }, // 4
      { value: 11, suit: Suit.Spades }, // 3
      { value: 11, suit: Suit.Diamonds }, // 2
      { value: 11, suit: Suit.Diamonds }, // A
      { value: 11, suit: Suit.Clubs }, // S
      { value: 11, suit: Suit.Clubs }, // K

      { value: 12, suit: Suit.Hearts }, //S
      { value: 12, suit: Suit.Hearts }, // Q
      { value: 12, suit: Suit.Spades }, // J
      { value: 12, suit: Suit.Spades }, //S
      { value: 12, suit: Suit.Diamonds }, // 10
      { value: 12, suit: Suit.Diamonds }, // 9
      { value: 12, suit: Suit.Clubs }, // 8
      { value: 12, suit: Suit.Clubs }, // S

      { value: 13, suit: Suit.Hearts }, // 7
      { value: 13, suit: Suit.Hearts }, // 6
      { value: 13, suit: Suit.Spades }, // 5
      { value: 13, suit: Suit.Spades }, // 4
      { value: 13, suit: Suit.Diamonds }, // 3
      { value: 13, suit: Suit.Diamonds }, // 2
      { value: 13, suit: Suit.Clubs }, // S
      { value: 13, suit: Suit.Clubs }, // S

      { value: 1, suit: Suit.Hearts } // A
    ];

    jest.spyOn(BuildDeckService, 'buildDeck').mockReturnValue(expectedDeck);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GameLogic Component', () => {
    it('renders itself without errors', () => {
      render(<GameLogic />);
    });

    describe('when the game starts', () => {
      it('seeds the tableau piles correctly', () => {
        render(<GameLogic />);
        const tableauSection = screen.getByTestId('tableau');
        const tableauPiles = within(tableauSection).getAllByRole('button');

        expect(tableauPiles.length).toEqual(14);
        tableauPiles.forEach((pile, index) => {
          expect(pile).toBeVisible();
          let expectedValue = '3';
          if (index > 1 && index < 13) {
            expectedValue = index > 8 ? 'A' : '2';
          }

          let expectedSuit = 'of Clubs';
          if (index === 6 || index === 12 || index === 13) {
            expectedSuit = 'of Spades';
          } else if (index === 11 || index === 5 || index === 4) {
            expectedSuit = 'of Diamonds';
          } else if (index < 2 || index === 8 || index === 7) {
            expectedSuit = 'of Hearts';
          }

          if (index === 10) {
            expect(within(pile).queryByText(expectedValue)).not.toBeInTheDocument();
            expect(within(pile).queryByAltText(expectedSuit)).not.toBeInTheDocument();
          } else {
            expect(within(pile).getByText(`${expectedValue}`)).toBeVisible();
            expect(within(pile).getByAltText(expectedSuit)).toBeVisible();
          }
        });
      });
    });

    describe('when a card is drawn', () => {
      it('puts the drawn card in the Hand section', async () => {
        const user = userEvent.setup();
        render(<GameLogic />);

        const tableauSection = screen.getByTestId('tableau');
        const tableauPiles = within(tableauSection).getAllByRole('button');
        const stockPile = tableauPiles[10];

        await user.click(stockPile);
        const hand = screen.getByTestId('hand');
        expect(within(hand).getByText('A')).toBeVisible();
        expect(within(hand).getByAltText('of Hearts')).toBeVisible();
      });
      it('only allows one card to be drawn at a time', async () => {
        const user = userEvent.setup();
        render(<GameLogic />);

        const tableauSection = screen.getByTestId('tableau');
        const tableauPiles = within(tableauSection).getAllByRole('button');
        const stockPile = tableauPiles[10];

        await user.click(stockPile);
        await user.click(stockPile);

        const hand = screen.getByTestId('hand');
        expect(within(hand).getByText('A')).toBeVisible();
        expect(within(hand).getByAltText('of Hearts')).toBeVisible();
      });
    });
  });
});
