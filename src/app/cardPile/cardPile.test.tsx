import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Suit } from '../cardContent/cardContent';
import CardPile, { CardPileProps } from './cardPile';

const defaultProps: CardPileProps = {
  name: 'Ace',
  label: 'A',
  handleCardPileInteract: () => {
    console.log('card pile handled');
  }
};

describe('CardPile', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('renders itself', () => {
    render(<CardPile {...defaultProps} />);
  });

  describe('when there are NOT cards in the card pile', () => {
    it('renders an empty pile', () => {
      render(<CardPile {...defaultProps} />);
      const pile = screen.getByRole('button', { name: 'The Ace pile is empty' });
      expect(pile).toBeVisible();
      expect(screen.getByText('A')).toBeVisible();
    });
  });

  describe('when there are cards in the card pile', () => {
    describe('when the pile is face-down', () => {
      it('renders a pile of face-down cards', () => {
        const myProps: CardPileProps = {
          ...defaultProps,
          cards: [{ suit: Suit.Hearts, value: 12 }]
        };
        render(<CardPile {...myProps} />);

        const cardPile = screen.getByRole('button');
        expect(cardPile).toBeVisible();
        expect(cardPile).not.toBeDisabled();
      });
      it('does NOT show the value of the top card', () => {
        const myProps: CardPileProps = {
          ...defaultProps,
          cards: [{ suit: Suit.Hearts, value: 2 }]
        };
        render(<CardPile {...myProps} />);

        const cardPile = screen.getByRole('button');
        expect(cardPile).toBeVisible();
        expect(screen.queryByText('2')).not.toBeInTheDocument();
        expect(screen.queryByAltText('of Hearts')).not.toBeInTheDocument();
      });
    });
    describe('when the pile is face-up', () => {
      it('renders the value of the top card', () => {
        const myProps: CardPileProps = {
          ...defaultProps,
          cards: [
            { suit: Suit.Spades, value: 12 },
            { suit: Suit.Hearts, value: 2 }
          ],
          isFaceUp: true
        };
        render(<CardPile {...myProps} />);

        const cardPile = screen.getByRole('button');
        expect(cardPile).toBeVisible();
        expect(cardPile).not.toBeDisabled();
        expect(screen.getByText('2')).toBeVisible();
        expect(screen.getByAltText('of Hearts')).toBeVisible();
      });
      it('shows the completed style if it is a completed foundation pile', () => {
        const myProps: CardPileProps = {
          ...defaultProps,
          cards: [{ suit: Suit.Hearts, value: 1 }],
          isCompletedFoundation: true,
          isFaceUp: true
        };
        render(<CardPile {...myProps} />);
        const cardPile = screen.getByRole('button');
        expect(cardPile).toHaveClass('completedFoundation');
      });
    });
    it('calls handlePileInteract when the card pile is clicked', async () => {
      const user = userEvent.setup();
      const handleCardPileInteractSpy = jest.fn();
      const myProps: CardPileProps = {
        ...defaultProps,
        cards: [{ suit: Suit.Hearts, value: 12 }],
        handleCardPileInteract: handleCardPileInteractSpy
      };
      render(<CardPile {...myProps} />);

      const pile = screen.getByRole('button');
      await user.click(pile);
      expect(handleCardPileInteractSpy).toHaveBeenCalled();
    });
  });
});
