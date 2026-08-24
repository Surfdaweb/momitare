import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import Modal, { ModalProps } from './modal';

const defaultProps: ModalProps = {
  content: 'Modal Content',
  confirmButtonText: 'Confirm',
  exitButtonText: 'Exit',
  handleExit: () => {
    console.log('exited');
  },
  handleConfirm: () => {
    console.log('confirmed');
  }
};

describe('Modal', () => {
  it('renders its basic content', () => {
    render(<Modal {...defaultProps} />);
    const text = screen.getByText('Modal Content');
    expect(text).toBeVisible();
  });

  it('renders the confirm button', () => {
    render(<Modal {...defaultProps} />);
    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    expect(confirmButton).toBeVisible();
  });

  it('triggers the confirm action when the confirm button is clicked', async () => {
    const user = userEvent.setup();
    const handleConfirmSpy = jest.fn();

    const myProps: ModalProps = {
      ...defaultProps,
      handleConfirm: handleConfirmSpy
    };
    render(<Modal {...myProps} />);
    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    await user.click(confirmButton);
    expect(handleConfirmSpy).toHaveBeenCalled();
  });

  it('renders the exit button', () => {
    render(<Modal {...defaultProps} />);
    const exitButton = screen.getByRole('button', { name: 'Exit' });
    expect(exitButton).toBeVisible();
  });

  it('triggers the exit action when the exit button is clicked', async () => {
    const user = userEvent.setup();
    const handleExitSpy = jest.fn();

    const myProps: ModalProps = {
      ...defaultProps,
      handleExit: handleExitSpy
    };
    render(<Modal {...myProps} />);
    const exitButton = screen.getByRole('button', { name: 'Exit' });
    await user.click(exitButton);
    expect(handleExitSpy).toHaveBeenCalled();
  });
});
