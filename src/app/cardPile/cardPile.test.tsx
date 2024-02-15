import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

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
      expect(screen.getByRole('button', { name: 'The Ace pile is empty' })).toBeVisible();
      expect(screen.getByText('A')).toBeVisible();
    });
  });

  describe('when there are cards in the card pile', () => {
    describe('when the pile is face-down', () => {
      it('renders a pile of face-down cards', () => {
        render(<CardPile {...defaultProps} />);
        const cardPile = screen.getByRole('button');
        expect(cardPile).toBeVisible();
      });
    });
  });
});
