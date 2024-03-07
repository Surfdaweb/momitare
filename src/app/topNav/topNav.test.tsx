import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import React from 'react';

import TopNav from './topNav';

describe('Page', () => {
  it('renders the correct main heading', () => {
    render(<TopNav />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toEqual('Momitaire');
  });
});
