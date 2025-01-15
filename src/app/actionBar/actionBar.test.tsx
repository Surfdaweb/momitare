import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ActionBar, { ActionBarProps } from './actionBar';

const defaultProps: ActionBarProps = {
  undoMove: () => {
    console.log('undo move');
  }
};

describe('ActionBar', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders itself without errors', () => {
    render(<ActionBar {...defaultProps} />);
  });

  it('renders an undo button', () => {
    render(<ActionBar {...defaultProps} />);
    const undoBtn = screen.getByRole('button', { name: 'Undo' });
    expect(undoBtn).toBeVisible();
  });

  it('calls the undo function when the undo button is clicked', async () => {
    const user = userEvent.setup();
    const undoMoveSpy = jest.fn();
    const myProps: ActionBarProps = {
      undoMove: undoMoveSpy
    };
    render(<ActionBar {...myProps} />);
    const undoBtn = screen.getByRole('button', { name: 'Undo' });
    await user.click(undoBtn);
    expect(undoMoveSpy).toHaveBeenCalledTimes(1);
  });
});
