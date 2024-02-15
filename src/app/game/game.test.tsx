import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import React from 'react';

import Game from './game';

describe('Game', () => {
  it('renders itself without errors', () => {
    render(<Game />);
  });

  // it('renders all value piles', () => {
  //   render(<Game />);
  //   const valuePiles = screen.getByRole('button');
  // });
});
