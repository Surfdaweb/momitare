import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ActionBar, { ActionBarProps } from './actionBar';

const defaultProps: ActionBarProps = {
  undoMove: () => {
    console.log('undo move');
  },
  startNewGame: () => {
    console.log('start new game');
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
      ...defaultProps,
      undoMove: undoMoveSpy
    };
    render(<ActionBar {...myProps} />);
    const undoBtn = screen.getByRole('button', { name: 'Undo' });
    await user.click(undoBtn);
    expect(undoMoveSpy).toHaveBeenCalledTimes(1);
  });

  it('renders a new game button', () => {
    render(<ActionBar {...defaultProps} />);
    const newGameBtn = screen.getByRole('button', { name: 'New Game' });
    expect(newGameBtn).toBeVisible();
  });

  it('calls the new game function when the new game button is clicked', async () => {
    const user = userEvent.setup();
    const newGameSpy = jest.fn();
    const myProps: ActionBarProps = {
      ...defaultProps,
      startNewGame: newGameSpy
    };
    render(<ActionBar {...myProps} />);
    const newGameBtn = screen.getByRole('button', { name: 'New Game' });
    await user.click(newGameBtn);
    expect(newGameSpy).toHaveBeenCalledTimes(1);
  });
});
