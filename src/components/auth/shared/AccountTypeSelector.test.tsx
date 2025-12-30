import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AccountTypeSelector from './AccountTypeSelector';

describe('AccountTypeSelector', () => {
  const mockRegister = vi.fn((name) => ({
    name,
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
  }));

  const mockWatch = vi.fn();
  const mockSetValue = vi.fn();
  const mockNext = vi.fn();

  const defaultProps = {
    register: mockRegister,
    watch: mockWatch,
    setValue: mockSetValue,
    next: mockNext,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders account type selector with buyer and seller options', () => {
    render(<AccountTypeSelector {...defaultProps} />);

    expect(screen.getByText(/comprador/i)).toBeInTheDocument();
    expect(screen.getByText(/vendedor/i)).toBeInTheDocument();
  });

  it('displays buyer description', () => {
    render(<AccountTypeSelector {...defaultProps} />);

    expect(
      screen.getByText(/busca y compra productos colombianos/i)
    ).toBeInTheDocument();
  });

  it('displays seller description', () => {
    render(<AccountTypeSelector {...defaultProps} />);

    expect(
      screen.getByText(/vende tus productos en todo el país/i)
    ).toBeInTheDocument();
  });

  it('highlights selected role when buyer is selected', () => {
    mockWatch.mockReturnValue('buyer');
    render(<AccountTypeSelector {...defaultProps} />);

    const buyerCard = screen.getByText(/comprador/i).closest('div');
    expect(buyerCard).toHaveClass('border-primary-500');
  });

  it('highlights selected role when seller is selected', () => {
    mockWatch.mockReturnValue('seller');
    render(<AccountTypeSelector {...defaultProps} />);

    const sellerCard = screen.getByText(/vendedor/i).closest('div');
    expect(sellerCard).toHaveClass('border-primary-500');
  });

  it('calls setValue and next when buyer card is clicked', () => {
    render(<AccountTypeSelector {...defaultProps} />);

    const buyerCard = screen.getByText(/comprador/i).closest('div');
    fireEvent.click(buyerCard!);

    expect(mockSetValue).toHaveBeenCalledWith('role', 'buyer');
    expect(mockNext).toHaveBeenCalled();
  });

  it('calls setValue and next when seller card is clicked', () => {
    render(<AccountTypeSelector {...defaultProps} />);

    const sellerCard = screen.getByText(/vendedor/i).closest('div');
    fireEvent.click(sellerCard!);

    expect(mockSetValue).toHaveBeenCalledWith('role', 'seller');
    expect(mockNext).toHaveBeenCalled();
  });

  it('renders with proper accessibility attributes', () => {
    render(<AccountTypeSelector {...defaultProps} />);

    const buyerCard = screen.getByText(/comprador/i).closest('div');
    const sellerCard = screen.getByText(/vendedor/i).closest('div');

    expect(buyerCard).toHaveAttribute('role', 'button');
    expect(sellerCard).toHaveAttribute('role', 'button');
  });
});

