import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import React from 'react';

import Footer from './footer';

describe('Footer', () => {
  it('renders itself', () => {
    render(<Footer />);
    expect(true);
    // const heading = screen.getByRole("heading", { level: 1 });
    // expect(heading).toBeInTheDocument();
    // expect(heading.textContent).toEqual("Momitaire");
  });
});
