import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import { Suit } from '../cardContent/cardContent';
import CardPile, { CardPileProps } from './cardPile';

const defaultProps: CardPileProps = {
  name: 'Ace',
  label: 'A'
};

describe('CardPile', () => {
  it('renders itself', () => {
    render(<CardPile {...defaultProps} />);
  });

  describe('when there are NOT cards in the card pile', () => {
    it('renders an empty pile', () => {
      render(<CardPile {...defaultProps} />);
      const pile = screen.getByRole('button', { name: 'The Ace pile is empty' });
      expect(pile).toBeVisible();
      expect(screen.getByText('A')).toBeVisible();
      expect(pile).toBeDisabled();
    });
  });

  describe('when there are cards in the card pile', () => {
    describe('when the pile is face-down', () => {
      it('renders a pile of face-down cards', () => {
        const myProps: CardPileProps = {
          cards: [{ suit: Suit.Hearts, value: 12 }],
          ...defaultProps
        };
        render(<CardPile {...myProps} />);

        const cardPile = screen.getByRole('button');
        expect(cardPile).toBeVisible();
        expect(cardPile).not.toBeDisabled();
      });
      it('does NOT show the value of the top card', () => {
        const myProps: CardPileProps = {
          cards: [{ suit: Suit.Hearts, value: 2 }],
          ...defaultProps
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
          cards: [
            { suit: Suit.Spades, value: 12 },
            { suit: Suit.Hearts, value: 2 }
          ],
          isFaceUp: true,
          ...defaultProps
        };
        render(<CardPile {...myProps} />);

        const cardPile = screen.getByRole('button');
        expect(cardPile).toBeVisible();
        expect(cardPile).not.toBeDisabled();
        expect(screen.getByText('2')).toBeVisible();
        expect(screen.getByAltText('of Hearts')).toBeVisible();
      });
    });
  });
});
