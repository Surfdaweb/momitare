import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import Footer, { FooterProps } from './footer';

const defaultProps: FooterProps = {
  score: 104
};

describe('Footer', () => {
  it('renders itself', () => {
    render(<Footer {...defaultProps} />);
    expect(true);
  });

  it('shows the score and value', () => {
    render(<Footer {...defaultProps} />);
    const scoreHeading = screen.getByText('Score');
    const scoreValue = screen.getByText('104');

    expect(scoreHeading).toBeVisible();
    expect(scoreValue).toBeVisible();
  });
});
