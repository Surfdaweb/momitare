import '@testing-library/jest-dom';

import { render, screen, within } from '@testing-library/react';
import React from 'react';

import { Card, Suit } from '../cardContent/cardContent';
import GameLogic, { buildDeck } from './gameLogic';

const expectedDeck: Card[] = [
  { value: 1, suit: Suit.Hearts }, //A
  { value: 1, suit: Suit.Spades },
  { value: 1, suit: Suit.Spades },
  { value: 1, suit: Suit.Diamonds },
  { value: 1, suit: Suit.Diamonds },
  { value: 1, suit: Suit.Clubs },
  { value: 1, suit: Suit.Clubs }, //7

  { value: 2, suit: Suit.Hearts }, //8
  { value: 2, suit: Suit.Hearts },
  { value: 2, suit: Suit.Spades },
  { value: 2, suit: Suit.Spades },
  { value: 2, suit: Suit.Diamonds },
  { value: 2, suit: Suit.Diamonds },
  { value: 2, suit: Suit.Clubs }, //K
  { value: 2, suit: Suit.Clubs },

  { value: 3, suit: Suit.Hearts },
  { value: 3, suit: Suit.Hearts },
  { value: 3, suit: Suit.Spades },
  { value: 3, suit: Suit.Spades },
  { value: 3, suit: Suit.Diamonds },
  { value: 3, suit: Suit.Diamonds },
  { value: 3, suit: Suit.Clubs },
  { value: 3, suit: Suit.Clubs },

  { value: 4, suit: Suit.Hearts },
  { value: 4, suit: Suit.Hearts },
  { value: 4, suit: Suit.Spades },
  { value: 4, suit: Suit.Spades },
  { value: 4, suit: Suit.Diamonds },
  { value: 4, suit: Suit.Diamonds },
  { value: 4, suit: Suit.Clubs },
  { value: 4, suit: Suit.Clubs },

  { value: 5, suit: Suit.Hearts },
  { value: 5, suit: Suit.Hearts },
  { value: 5, suit: Suit.Spades },
  { value: 5, suit: Suit.Spades },
  { value: 5, suit: Suit.Diamonds },
  { value: 5, suit: Suit.Diamonds },
  { value: 5, suit: Suit.Clubs },
  { value: 5, suit: Suit.Clubs },

  { value: 6, suit: Suit.Hearts },
  { value: 6, suit: Suit.Hearts },
  { value: 6, suit: Suit.Spades },
  { value: 6, suit: Suit.Spades },
  { value: 6, suit: Suit.Diamonds },
  { value: 6, suit: Suit.Diamonds },
  { value: 6, suit: Suit.Clubs },
  { value: 6, suit: Suit.Clubs },

  { value: 7, suit: Suit.Hearts },
  { value: 7, suit: Suit.Hearts },
  { value: 7, suit: Suit.Spades },
  { value: 7, suit: Suit.Spades },
  { value: 7, suit: Suit.Diamonds },
  { value: 7, suit: Suit.Diamonds },
  { value: 7, suit: Suit.Clubs },
  { value: 7, suit: Suit.Clubs },

  { value: 8, suit: Suit.Hearts },
  { value: 8, suit: Suit.Hearts },
  { value: 8, suit: Suit.Spades },
  { value: 8, suit: Suit.Spades },
  { value: 8, suit: Suit.Diamonds },
  { value: 8, suit: Suit.Diamonds },
  { value: 8, suit: Suit.Clubs },
  { value: 8, suit: Suit.Clubs },

  { value: 9, suit: Suit.Hearts },
  { value: 9, suit: Suit.Hearts },
  { value: 9, suit: Suit.Spades },
  { value: 9, suit: Suit.Spades },
  { value: 9, suit: Suit.Diamonds },
  { value: 9, suit: Suit.Diamonds },
  { value: 9, suit: Suit.Clubs },
  { value: 9, suit: Suit.Clubs },

  { value: 10, suit: Suit.Hearts },
  { value: 10, suit: Suit.Hearts },
  { value: 10, suit: Suit.Spades },
  { value: 10, suit: Suit.Spades },
  { value: 10, suit: Suit.Diamonds },
  { value: 10, suit: Suit.Diamonds },
  { value: 10, suit: Suit.Clubs },
  { value: 10, suit: Suit.Clubs },

  { value: 11, suit: Suit.Hearts },
  { value: 11, suit: Suit.Hearts },
  { value: 11, suit: Suit.Spades },
  { value: 11, suit: Suit.Spades },
  { value: 11, suit: Suit.Diamonds },
  { value: 11, suit: Suit.Diamonds },
  { value: 11, suit: Suit.Clubs },
  { value: 11, suit: Suit.Clubs },

  { value: 12, suit: Suit.Hearts },
  { value: 12, suit: Suit.Hearts },
  { value: 12, suit: Suit.Spades },
  { value: 12, suit: Suit.Spades },
  { value: 12, suit: Suit.Diamonds },
  { value: 12, suit: Suit.Diamonds },
  { value: 12, suit: Suit.Clubs },
  { value: 12, suit: Suit.Clubs },

  { value: 13, suit: Suit.Hearts },
  { value: 13, suit: Suit.Hearts },
  { value: 13, suit: Suit.Spades },
  { value: 13, suit: Suit.Spades },
  { value: 13, suit: Suit.Diamonds },
  { value: 13, suit: Suit.Diamonds },
  { value: 13, suit: Suit.Clubs },
  { value: 13, suit: Suit.Clubs },

  { value: 1, suit: Suit.Hearts }
];

describe('GameLogic', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
  });
  afterEach(() => {
    jest.clearAllMocks();
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
          const expectedValue = index < 7 ? 'A' : '2';

          let expectedSuit = 'of Hearts';
          if (index === 1 || index === 2 || index === 9 || index === 10) {
            expectedSuit = 'of Spades';
          } else if (index === 3 || index === 4 || index === 11 || index === 12) {
            expectedSuit = 'of Diamonds';
          } else if (index === 5 || index === 6 || index === 13) {
            expectedSuit = 'of Clubs';
          }

          if (index === 10) {
            expect(within(pile).queryByText(`${expectedValue}`)).not.toBeInTheDocument();
            expect(within(pile).queryByAltText(expectedSuit)).not.toBeInTheDocument();
          } else {
            expect(within(pile).getByText(`${expectedValue}`)).toBeVisible();
            expect(within(pile).getByAltText(expectedSuit)).toBeVisible();
          }
        });
      });
    });
  });

  describe('when the dealer deck is built', () => {
    it('adds all cards for a double-deck game', () => {
      const result = buildDeck();
      expect(result.length).toEqual(104);
      expect(result).toEqual(expect.arrayContaining(expectedDeck));
      expect(expectedDeck).toEqual(expect.arrayContaining(result));
    });
    it('shuffles the cards', () => {
      const result = buildDeck();
      expect(result).toStrictEqual(expectedDeck);
    });
  });
});
