import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuantitySelector from './QuantitySelector';

describe('QuantitySelector', () => {
  it('renders current quantity', () => {
    render(<QuantitySelector quantity={5} onQuantityChange={() => {}} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onQuantityChange when increment button is clicked', () => {
    const handleChange = vi.fn();
    render(<QuantitySelector quantity={5} onQuantityChange={handleChange} />);
    
    const incrementButton = screen.getAllByRole('button')[1];
    fireEvent.click(incrementButton);
    
    expect(handleChange).toHaveBeenCalledWith(6);
  });

  it('calls onQuantityChange when decrement button is clicked', () => {
    const handleChange = vi.fn();
    render(<QuantitySelector quantity={5} onQuantityChange={handleChange} />);
    
    const decrementButton = screen.getAllByRole('button')[0];
    fireEvent.click(decrementButton);
    
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it('disables decrement button at minimum', () => {
    render(<QuantitySelector quantity={1} min={1} onQuantityChange={() => {}} />);
    
    const decrementButton = screen.getAllByRole('button')[0];
    expect(decrementButton).toBeDisabled();
  });

  it('disables increment button at maximum', () => {
    render(<QuantitySelector quantity={10} max={10} onQuantityChange={() => {}} />);
    
    const incrementButton = screen.getAllByRole('button')[1];
    expect(incrementButton).toBeDisabled();
  });

  it('disables both buttons when disabled prop is true', () => {
    render(<QuantitySelector quantity={5} disabled onQuantityChange={() => {}} />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('applies correct size classes', () => {
    const { container } = render(
      <QuantitySelector quantity={5} size="lg" onQuantityChange={() => {}} />
    );
    
    const quantityText = screen.getByText('5');
    expect(quantityText).toHaveClass('w-16', 'text-lg');
  });
});

