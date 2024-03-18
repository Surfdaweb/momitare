import { render } from '@testing-library/react';
import React from 'react';

import { Card, Suit } from '../cardContent/cardContent';
import GameLogic, { buildDeck } from './gameLogic';

const expectedDeck: Card[] = [
  { value: 1, suit: Suit.Hearts },
  { value: 1, suit: Suit.Spades },
  { value: 1, suit: Suit.Spades },
  { value: 1, suit: Suit.Diamonds },
  { value: 1, suit: Suit.Diamonds },
  { value: 1, suit: Suit.Clubs },
  { value: 1, suit: Suit.Clubs },

  { value: 2, suit: Suit.Hearts },
  { value: 2, suit: Suit.Hearts },
  { value: 2, suit: Suit.Spades },
  { value: 2, suit: Suit.Spades },
  { value: 2, suit: Suit.Diamonds },
  { value: 2, suit: Suit.Diamonds },
  { value: 2, suit: Suit.Clubs },
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
  { value: 12, suit: Suit.Spades }, //7
  { value: 12, suit: Suit.Spades },
  { value: 12, suit: Suit.Diamonds },
  { value: 12, suit: Suit.Diamonds },
  { value: 12, suit: Suit.Clubs },
  { value: 12, suit: Suit.Clubs },

  { value: 13, suit: Suit.Hearts },
  { value: 13, suit: Suit.Hearts },

  { value: 13, suit: Suit.Spades }, //A
  { value: 13, suit: Suit.Spades },
  { value: 13, suit: Suit.Diamonds },
  { value: 13, suit: Suit.Diamonds },
  { value: 13, suit: Suit.Clubs },
  { value: 13, suit: Suit.Clubs }, //6

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
  });

  describe('building the dealer deck', () => {
    it('adds all cards for a double-deck game', () => {
      const result = buildDeck();
      expect(result.length).toEqual(104);
      expect(result).toEqual(expect.arrayContaining(expectedDeck));
      expect(expectedDeck).toEqual(expect.arrayContaining(result));
    });
    it('shuffles the cards', () => {
      const result = buildDeck();
      console.log(result);
      expect(result).toStrictEqual(expectedDeck);
    });
  });
});
