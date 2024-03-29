import { Card, Suit } from '../../cardContent/cardContent';
import { BuildDeckService } from './buildDeck.service';

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

describe('BuildDeckService', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('adds all cards for a double-deck game', () => {
    const result = BuildDeckService.buildDeck();
    expect(result.length).toEqual(104);
    expect(result).toEqual(expect.arrayContaining(expectedDeck));
    expect(expectedDeck).toEqual(expect.arrayContaining(result));
  });
  it('shuffles the cards', () => {
    const result = BuildDeckService.buildDeck();
    expect(result).toStrictEqual(expectedDeck);
  });
});
