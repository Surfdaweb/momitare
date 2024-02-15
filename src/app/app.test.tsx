import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import Home from './page';

describe('Page', () => {
  it('renders the correct main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toEqual('Momitaire');
  });

  it('shows a Start Game button', () => {
    render(<Home />);
    expect(screen.getByRole('button', { name: 'Start Game' })).toBeInTheDocument();
  });
});
