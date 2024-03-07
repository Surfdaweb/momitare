import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import CardContent, { CardProps, Suit } from './cardContent';

const defaultProps: CardProps = {
  card: { value: 2, suit: Suit.Hearts }
};

describe('CardContent', () => {
  it('renders itself', () => {
    render(<CardContent {...defaultProps} />);
  });

  it('renders the value of the card', () => {
    render(<CardContent {...defaultProps} />);
    expect(screen.getByText('2')).toBeVisible();
  });

  it('renders the correct symbol for an Ace card', () => {
    const myProps: CardProps = {
      card: { suit: Suit.Hearts, value: 1 }
    };
    render(<CardContent {...myProps} />);
    expect(screen.getByText('A')).toBeVisible();
  });

  it('renders the correct symbol for an Jack card', () => {
    const myProps: CardProps = {
      card: { suit: Suit.Hearts, value: 11 }
    };
    render(<CardContent {...myProps} />);
    expect(screen.getByText('J')).toBeVisible();
  });

  it('renders the correct symbol for an Queen card', () => {
    const myProps: CardProps = {
      card: { suit: Suit.Hearts, value: 12 }
    };
    render(<CardContent {...myProps} />);
    expect(screen.getByText('Q')).toBeVisible();
  });

  it('renders the correct symbol for an King card', () => {
    const myProps: CardProps = {
      card: { suit: Suit.Hearts, value: 13 }
    };
    render(<CardContent {...myProps} />);
    expect(screen.getByText('K')).toBeVisible();
  });

  it('renders the correct suit of the card', () => {
    render(<CardContent {...defaultProps} />);
    expect(screen.getByAltText('of hearts')).toBeVisible();
  });
});
