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
      { value: 1, suit: Suit.Hearts }, // S  1
      { value: 1, suit: Suit.Spades }, // Q
      { value: 1, suit: Suit.Spades }, // S  2
      { value: 1, suit: Suit.Diamonds }, // J
      { value: 1, suit: Suit.Diamonds }, // S  3
      { value: 1, suit: Suit.Clubs }, // S  4
      { value: 1, suit: Suit.Clubs }, // 10

      { value: 2, suit: Suit.Hearts }, // 9
      { value: 2, suit: Suit.Hearts }, // 8
      { value: 2, suit: Suit.Spades }, // S  5
      { value: 2, suit: Suit.Spades }, // 7
      { value: 2, suit: Suit.Diamonds }, // 6
      { value: 2, suit: Suit.Diamonds }, // 5
      { value: 2, suit: Suit.Clubs }, // 4
      { value: 2, suit: Suit.Clubs }, // 3

      { value: 3, suit: Suit.Hearts }, // 2
      { value: 3, suit: Suit.Hearts }, // A
      { value: 3, suit: Suit.Spades }, // S  6
      { value: 3, suit: Suit.Spades }, // K
      { value: 3, suit: Suit.Diamonds }, // Q
      { value: 3, suit: Suit.Diamonds }, // J
      { value: 3, suit: Suit.Clubs }, // S  7
      { value: 3, suit: Suit.Clubs }, // 10

      { value: 4, suit: Suit.Hearts }, // 9
      { value: 4, suit: Suit.Hearts }, // 8
      { value: 4, suit: Suit.Spades }, // S  8
      { value: 4, suit: Suit.Spades }, // 7
      { value: 4, suit: Suit.Diamonds }, // 6
      { value: 4, suit: Suit.Diamonds }, // 5
      { value: 4, suit: Suit.Clubs }, // S  9
      { value: 4, suit: Suit.Clubs }, // 4

      { value: 5, suit: Suit.Hearts }, // 3
      { value: 5, suit: Suit.Hearts }, // 2
      { value: 5, suit: Suit.Spades }, // A
      { value: 5, suit: Suit.Spades }, // S  10
      { value: 5, suit: Suit.Diamonds }, // K
      { value: 5, suit: Suit.Diamonds }, // Q
      { value: 5, suit: Suit.Clubs }, // J
      { value: 5, suit: Suit.Clubs }, // S  11

      { value: 6, suit: Suit.Hearts }, // 10
      { value: 6, suit: Suit.Hearts }, // 9
      { value: 6, suit: Suit.Spades }, // 8
      { value: 6, suit: Suit.Spades }, // S  12
      { value: 6, suit: Suit.Diamonds }, // 7
      { value: 6, suit: Suit.Diamonds }, // S  13
      { value: 6, suit: Suit.Clubs }, // 6
      { value: 6, suit: Suit.Clubs }, // 5

      { value: 7, suit: Suit.Hearts }, // 4
      { value: 7, suit: Suit.Hearts }, // 3
      { value: 7, suit: Suit.Spades }, // 2
      { value: 7, suit: Suit.Spades }, // A
      { value: 7, suit: Suit.Diamonds }, // S  14
      { value: 7, suit: Suit.Diamonds }, // K
      { value: 7, suit: Suit.Clubs }, // Q
      { value: 7, suit: Suit.Clubs }, // J

      { value: 8, suit: Suit.Hearts }, // S  15
      { value: 8, suit: Suit.Hearts }, // 10
      { value: 8, suit: Suit.Spades }, // 9
      { value: 8, suit: Suit.Spades }, // S  16
      { value: 8, suit: Suit.Diamonds }, // 8
      { value: 8, suit: Suit.Diamonds }, // S  17
      { value: 8, suit: Suit.Clubs }, // 7
      { value: 8, suit: Suit.Clubs }, // 6

      { value: 9, suit: Suit.Hearts }, // 5
      { value: 9, suit: Suit.Hearts }, // 4
      { value: 9, suit: Suit.Spades }, // 3
      { value: 9, suit: Suit.Spades }, // 2
      { value: 9, suit: Suit.Diamonds }, // A
      { value: 9, suit: Suit.Diamonds }, // S  18
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

    describe('when a pile is opened', () => {
      it('shows the cards from the correct tableau pile', async () => {
        const user = userEvent.setup();
        render(<GameLogic />);

        const tableauSection = screen.getByTestId('tableau');
        const tableauPiles = within(tableauSection).getAllByRole('button');
        const stockPile = tableauPiles[10];

        await user.click(stockPile);
        await user.click(tableauPiles[0]);

        const hand = screen.getByTestId('hand');
        const cardsInHand = within(hand).getAllByRole('button');
        expect(cardsInHand.length).toEqual(7);

        expect(within(cardsInHand[0]).getByText('A')).toBeVisible();
        expect(within(cardsInHand[0]).getByAltText('of Hearts')).toBeVisible();

        expect(within(cardsInHand[1]).getByText('A')).toBeVisible();
        expect(within(cardsInHand[1]).getByAltText('of Hearts')).toBeVisible();

        expect(within(cardsInHand[2]).getByText('J')).toBeVisible();
        expect(within(cardsInHand[2]).getByAltText('of Diamonds')).toBeVisible();

        expect(within(cardsInHand[3]).getByText('9')).toBeVisible();
        expect(within(cardsInHand[3]).getByAltText('of Diamonds')).toBeVisible();

        expect(within(cardsInHand[4]).getByText('7')).toBeVisible();
        expect(within(cardsInHand[4]).getByAltText('of Spades')).toBeVisible();

        expect(within(cardsInHand[5]).getByText('5')).toBeVisible();
        expect(within(cardsInHand[5]).getByAltText('of Spades')).toBeVisible();

        expect(within(cardsInHand[6]).getByText('3')).toBeVisible();
        expect(within(cardsInHand[6]).getByAltText('of Hearts')).toBeVisible();
      });
      it('removes the cards from the tableau pile', async () => {
        const user = userEvent.setup();
        render(<GameLogic />);

        const tableauSection = screen.getByTestId('tableau');
        const tableauPiles = within(tableauSection).getAllByRole('button');
        const stockPile = tableauPiles[10];

        await user.click(stockPile);
        await user.click(tableauPiles[0]);

        expect(within(tableauPiles[0]).getByText('A')).toBeVisible();
        expect(within(tableauPiles[0]).queryByAltText('of Hearts')).not.toBeInTheDocument();
      });
      it('can be closed', async () => {
        const user = userEvent.setup();
        render(<GameLogic />);

        const tableauSection = screen.getByTestId('tableau');
        const tableauPiles = within(tableauSection).getAllByRole('button');
        const stockPile = tableauPiles[10];

        await user.click(stockPile);
        await user.click(tableauPiles[0]);
        await user.click(tableauPiles[0]);

        expect(within(tableauPiles[0]).getByText('3')).toBeVisible();
        expect(within(tableauPiles[0]).getByAltText('of Hearts')).toBeVisible();
      });
      describe('when a card is clicked', () => {
        it('adds the card to a foundation pile', async () => {
          const user = userEvent.setup();
          render(<GameLogic />);

          const tableauSection = screen.getByTestId('tableau');
          const tableauPiles = within(tableauSection).getAllByRole('button');
          const stockPile = tableauPiles[10];

          await user.click(stockPile);
          await user.click(tableauPiles[0]);

          const hand = screen.getByTestId('hand');
          const cardsInHand = within(hand).getAllByRole('button');
          const cardToPlace = cardsInHand[0];

          await user.click(cardToPlace);

          const foundationSection = screen.getByTestId('foundations');
          const foundations = within(foundationSection).getAllByRole('button');

          expect(within(foundations[0]).getByText('A')).toBeVisible();
          expect(within(foundations[0]).getByAltText('of Hearts')).toBeVisible();
        });
        it('removes the card from the hand', async () => {
          const user = userEvent.setup();
          render(<GameLogic />);

          const tableauSection = screen.getByTestId('tableau');
          const tableauPiles = within(tableauSection).getAllByRole('button');
          const stockPile = tableauPiles[10];

          await user.click(stockPile);
          await user.click(tableauPiles[0]);

          const hand = screen.getByTestId('hand');
          const cardsInHand = within(hand).getAllByRole('button');
          const cardToPlace = cardsInHand[0];

          await user.click(cardToPlace);

          const afterHand = screen.getByTestId('hand');
          const afterCardsInHand = within(afterHand).getAllByRole('button');

          expect(afterCardsInHand.length).toEqual(6);
        });
      });
    });

    describe('when a tableau pile is clicked', () => {
      it('adds the top card to a foundation pile', async () => {
        const user = userEvent.setup();
        render(<GameLogic />);

        const tableauSection = screen.getByTestId('tableau');
        const tableauPiles = within(tableauSection).getAllByRole('button');

        await user.click(tableauPiles[12]);

        const foundationSection = screen.getByTestId('foundations');
        const foundations = within(foundationSection).getAllByRole('button');

        expect(within(foundations[0]).getByText('A')).toBeVisible();
        expect(within(foundations[0]).getByAltText('of Spades')).toBeVisible();
      });
      it('shows the next card in the pile', async () => {
        const user = userEvent.setup();
        render(<GameLogic />);

        const tableauSection = screen.getByTestId('tableau');
        const tableauPiles = within(tableauSection).getAllByRole('button');

        await user.click(tableauPiles[12]);

        const afterTableauSection = screen.getByTestId('tableau');
        const afterTableauPiles = within(afterTableauSection).getAllByRole('button');

        expect(within(afterTableauPiles[12]).getByText('3')).toBeVisible();
        expect(within(afterTableauPiles[12]).getByAltText('of Diamonds')).toBeVisible();
      });
    });

    describe('when an attempt is made to add a card to a foundation pile', () => {
      it('ensures only an Ace can start the first 4 foundation piles', async () => {
        const user = userEvent.setup();
        render(<GameLogic />);

        const tableauSection = screen.getByTestId('tableau');
        const tableauPiles = within(tableauSection).getAllByRole('button');

        await user.click(tableauPiles[0]);

        const foundationSection = screen.getByTestId('foundations');
        const foundations = within(foundationSection).getAllByRole('button');

        expect(within(foundations[0]).getByText('A')).toBeVisible();
        expect(within(foundations[0]).queryByText('3')).not.toBeInTheDocument();

        await user.click(tableauPiles[12]);

        const secondFoundationSection = screen.getByTestId('foundations');
        const secondFoundations = within(secondFoundationSection).getAllByRole('button');

        expect(within(secondFoundations[0]).getByText('A')).toBeVisible();
        expect(within(secondFoundations[0]).getByAltText('of Spades')).toBeVisible();
      });
      it('ensures two Ace piles cannot share suits', async () => {
        const user = userEvent.setup();
        render(<GameLogic />);

        const tableauSection = screen.getByTestId('tableau');
        const tableauPiles = within(tableauSection).getAllByRole('button');

        await user.click(tableauPiles[12]);
        await user.click(tableauPiles[10]);
        await user.click(within(screen.getByTestId('hand')).getAllByRole('button')[0]);
        await user.click(tableauPiles[10]);
        await user.click(within(screen.getByTestId('hand')).getAllByRole('button')[0]);

        const foundationSection = screen.getByTestId('foundations');
        const foundations = within(foundationSection).getAllByRole('button');

        expect(within(foundations[0]).getByText('A')).toBeVisible();
        expect(within(foundations[0]).getByAltText('of Spades')).toBeVisible();
        expect(within(foundations[1]).getByText('A')).toBeVisible();
        expect(within(foundations[1]).getByAltText('of Hearts')).toBeVisible();
        expect(within(foundations[2]).getByText('A')).toBeVisible();
        expect(within(foundations[2]).queryByAltText('of Spades')).not.toBeInTheDocument();
      });
      it('ensures that adding a card to an Ace pile requires an ascending card value', async () => {
        const user = userEvent.setup();
        render(<GameLogic />);

        const tableauSection = screen.getByTestId('tableau');
        const tableauPiles = within(tableauSection).getAllByRole('button');

        await user.click(tableauPiles[12]);
        await user.click(tableauPiles[13]);

        const foundationSection = screen.getByTestId('foundations');
        const foundations = within(foundationSection).getAllByRole('button');

        expect(within(foundations[0]).getByText('A')).toBeVisible();
        expect(within(foundations[0]).getByAltText('of Spades')).toBeVisible();

        await user.click(tableauPiles[6]);
        const secondFoundationSection = screen.getByTestId('foundations');
        const secondFoundations = within(secondFoundationSection).getAllByRole('button');

        expect(within(secondFoundations[0]).getByText('2')).toBeVisible();
        expect(within(secondFoundations[0]).getByAltText('of Spades')).toBeVisible();
      });
      it('ensures only a King can start the last 4 foundation piles', async () => {
        const user = userEvent.setup();
        render(<GameLogic />);

        const tableauSection = screen.getByTestId('tableau');
        const tableauPiles = within(tableauSection).getAllByRole('button');

        await user.click(tableauPiles[0]);

        const foundationSection = screen.getByTestId('foundations');
        const foundations = within(foundationSection).getAllByRole('button');

        expect(within(foundations[5]).getByText('K')).toBeVisible();
        expect(within(foundations[5]).queryByText('3')).not.toBeInTheDocument();

        await user.click(tableauPiles[10]);
        await user.click(within(screen.getByTestId('hand')).getAllByRole('button')[0]);
        await user.click(tableauPiles[10]);
        await user.click(within(screen.getByTestId('hand')).getAllByRole('button')[0]);
        await user.click(tableauPiles[10]);
        await user.click(within(screen.getByTestId('hand')).getAllByRole('button')[0]);
        await user.click(tableauPiles[10]);
        await user.click(within(screen.getByTestId('hand')).getAllByRole('button')[0]);
        await user.click(tableauPiles[10]);
        await user.click(tableauPiles[1]);
        await user.click(within(screen.getByTestId('hand')).getByText('K'));

        const secondFoundationSection = screen.getByTestId('foundations');
        const secondFoundations = within(secondFoundationSection).getAllByRole('button');

        expect(within(secondFoundations[4]).getByText('K')).toBeVisible();
        expect(within(secondFoundations[4]).getByAltText('of Diamonds')).toBeVisible();
      });
      it('ensures two King piles cannot share suits', async () => {
        const user = userEvent.setup();
        render(<GameLogic />);

        const tableauSection = screen.getByTestId('tableau');
        const tableauPiles = within(tableauSection).getAllByRole('button');

        await user.click(tableauPiles[10]);
        await user.click(within(screen.getByTestId('hand')).getAllByRole('button')[0]);
        await user.click(tableauPiles[10]);
        await user.click(within(screen.getByTestId('hand')).getAllByRole('button')[0]);
        await user.click(tableauPiles[10]);
        await user.click(within(screen.getByTestId('hand')).getAllByRole('button')[0]);
        await user.click(tableauPiles[10]);
        await user.click(within(screen.getByTestId('hand')).getAllByRole('button')[0]);
        await user.click(tableauPiles[10]);
        await user.click(tableauPiles[1]);
        await user.click(within(screen.getByTestId('hand')).getByText('K'));
        await user.click(within(screen.getByTestId('hand')).getByText('2'));
        await user.click(tableauPiles[1]);
        await user.click(tableauPiles[10]);
        await user.click(tableauPiles[2]);
        await user.click(within(screen.getByTestId('hand')).getByText('K'));

        const foundationSection = screen.getByTestId('foundations');
        const foundations = within(foundationSection).getAllByRole('button');

        expect(within(foundations[4]).getByText('K')).toBeVisible();
        expect(within(foundations[4]).getByAltText('of Diamonds')).toBeVisible();
        expect(within(foundations[5]).getByText('K')).toBeVisible();
        expect(within(foundations[5]).queryByAltText('of Diamonds')).not.toBeInTheDocument();
      });
      it('ensures that adding a card to a King pile requires an descending card value', async () => {
        const user = userEvent.setup();
        render(<GameLogic />);

        const tableauSection = screen.getByTestId('tableau');
        const tableauPiles = within(tableauSection).getAllByRole('button');

        //pull 18 cards to get a King and a Queen
        await user.click(tableauPiles[10]); //1
        await user.click(within(screen.getByTestId('hand')).getByText('A'));
        await user.click(tableauPiles[10]); //2
        await user.click(within(screen.getByTestId('hand')).getByText('A'));
        await user.click(tableauPiles[10]); //3
        await user.click(within(screen.getByTestId('hand')).getByText('A'));
        await user.click(tableauPiles[10]); //4
        await user.click(within(screen.getByTestId('hand')).getByText('A'));
        await user.click(tableauPiles[10]); //5
        await user.click(tableauPiles[1]);
        await user.click(within(screen.getByTestId('hand')).getByText('K'));
        await user.click(tableauPiles[1]);
        await user.click(tableauPiles[10]); //6
        await user.click(tableauPiles[2]);
        await user.click(tableauPiles[2]);
        await user.click(tableauPiles[10]); //7
        await user.click(tableauPiles[2]);
        await user.click(tableauPiles[2]);
        await user.click(tableauPiles[10]); //8
        await user.click(tableauPiles[3]);
        await user.click(tableauPiles[3]);
        await user.click(tableauPiles[10]); //9
        await user.click(tableauPiles[3]);
        await user.click(tableauPiles[3]);
        await user.click(tableauPiles[10]); //10
        await user.click(tableauPiles[4]);
        await user.click(tableauPiles[4]);
        await user.click(tableauPiles[10]); //11
        await user.click(tableauPiles[4]);
        await user.click(tableauPiles[4]);
        await user.click(tableauPiles[10]); //12
        await user.click(tableauPiles[5]);
        await user.click(tableauPiles[5]);
        await user.click(tableauPiles[10]); //13
        await user.click(tableauPiles[5]);
        await user.click(tableauPiles[5]);
        await user.click(tableauPiles[10]); //14
        await user.click(tableauPiles[6]);
        await user.click(tableauPiles[6]);
        await user.click(tableauPiles[10]); //15
        await user.click(tableauPiles[7]);
        await user.click(tableauPiles[7]);
        await user.click(tableauPiles[10]); //16
        await user.click(tableauPiles[7]);
        await user.click(tableauPiles[7]);
        await user.click(tableauPiles[10]); //17
        await user.click(tableauPiles[7]);
        await user.click(tableauPiles[7]);
        await user.click(tableauPiles[10]); //18
        await user.click(tableauPiles[8]);
        await user.click(within(screen.getByTestId('hand')).getByText('Q'));
        await user.click(within(screen.getByTestId('hand')).getByText('9'));

        const foundationSection = screen.getByTestId('foundations');
        const foundations = within(foundationSection).getAllByRole('button');

        expect(within(foundations[4]).getByText('Q')).toBeVisible();
        expect(within(foundations[4]).getByAltText('of Diamonds')).toBeVisible();
      });
      it('ensures that a card can only be added to a pile of the same suit', async () => {
        const user = userEvent.setup();
        render(<GameLogic />);

        const tableauSection = screen.getByTestId('tableau');
        const tableauPiles = within(tableauSection).getAllByRole('button');

        await user.click(tableauPiles[12]);
        await user.click(tableauPiles[8]);

        const foundationSection = screen.getByTestId('foundations');
        const foundations = within(foundationSection).getAllByRole('button');

        expect(within(foundations[0]).getByText('A')).toBeVisible();
        expect(within(foundations[0]).getByAltText('of Spades')).toBeVisible();
      });
    });
  });
});
