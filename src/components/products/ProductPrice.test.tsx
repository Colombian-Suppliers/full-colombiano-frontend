import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductPrice from './ProductPrice';

describe('ProductPrice', () => {
  it('renders price correctly', () => {
    render(<ProductPrice price={45000} />);
    expect(screen.getByText(/45\.000/)).toBeInTheDocument();
  });

  it('displays discount badge when original price is provided', () => {
    render(<ProductPrice price={30000} originalPrice={60000} />);
    expect(screen.getByText(/-50%/)).toBeInTheDocument();
  });

  it('shows original price with strikethrough when discounted', () => {
    const { container } = render(<ProductPrice price={30000} originalPrice={60000} />);
    const strikethrough = container.querySelector('.line-through');
    expect(strikethrough).toBeInTheDocument();
  });

  it('hides discount badge when showDiscount is false', () => {
    render(<ProductPrice price={30000} originalPrice={60000} showDiscount={false} />);
    expect(screen.queryByText(/-50%/)).not.toBeInTheDocument();
  });

  it('calculates discount percentage correctly', () => {
    render(<ProductPrice price={25000} originalPrice={100000} />);
    expect(screen.getByText(/-75%/)).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<ProductPrice price={45000} size="sm" />);
    let priceElement = screen.getByText(/45\.000/);
    expect(priceElement).toHaveClass('text-sm');

    rerender(<ProductPrice price={45000} size="lg" />);
    priceElement = screen.getByText(/45\.000/);
    expect(priceElement).toHaveClass('text-2xl');
  });

  it('does not show discount elements when no original price', () => {
    const { container } = render(<ProductPrice price={45000} />);
    expect(container.querySelector('.line-through')).not.toBeInTheDocument();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });
});

